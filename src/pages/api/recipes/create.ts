import { NextApiRequest, NextApiResponse } from 'next'
import {
  checkBody,
  logPrismaError,
  prisma,
  validateAccessToken,
} from '../../../utils/Server'
import { Prisma } from '@prisma/client'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  switch (req.method) {
    case 'POST':
      // noinspection JSUnusedLocalSymbols
      const [token, error] = validateAccessToken(
        req.cookies?.auth,
        '/recipes/create',
        res,
      )
      if (token === undefined) break
      const requiredFields: string[] = [
        'title',
        'private',
        'timeToComplete',
        'ingredients',
        'steps',
        'notes',
        'isDraft',
      ]
      if (checkBody(req.body, requiredFields, res)) {
        try {
          await prisma.recipe.create({
            data: {
              author: {
                connect: {
                  id: token.id,
                },
              },
              authorUsername: token.username,
              authorName: `${token.firstName} ${token.lastName}`,
              isPrivate: req.body.private,
              isDraft: req.body.isDraft,
              publishedAt: `${Date.now()}`,
              title: req.body.title,
              timeToComplete: req.body.timeToComplete,
              ingredients: req.body.ingredients,
              steps: req.body.steps,
              notes: req.body.notes,
            },
          })
          const userRecipes = await prisma.recipe.findMany({
            where: {
              authorUsername: token.username,
            },
          })
          res.json(userRecipes)
        } catch (e) {
          const errorResponse: {
            message: string
            prismaError?: Prisma.PrismaClientKnownRequestError
          } = {
            message: 'Failed to create recipe',
          }
          if (e instanceof Prisma.PrismaClientKnownRequestError) {
            logPrismaError(e, '/recipes/create')
            errorResponse.prismaError = e
          }
          res.json(errorResponse)
        }
      }
      break
    default:
      res.status(405).json({
        message: `Method not allowed`,
      })
  }
}
