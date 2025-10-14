/**
 * @fileoverview Disallow @InjectRepository decorator outside of service files
 * @author Daytona
 */

module.exports = {
  meta: {
    type: 'problem',
    docs: {
      description:
        'Disallow @InjectRepository decorator outside of service files (*.service.ts)',
      category: 'Best Practices',
      recommended: true,
    },
    messages: {
      noInjectRepositoryOutsideServices:
        '@InjectRepository should only be used in services (*.service.ts).',
    },
    schema: [],
  },

  create(context) {
    const filename = context.getFilename()

    // Allow in .service.ts files or files in /services/ directory
    if (filename.endsWith('.service.ts') || filename.includes('/services/')) {
      return {}
    }

    return {
      // Match decorator usage: @InjectRepository(...)
      Decorator(node) {
        // Check if decorator is InjectRepository
        if (
          node.expression.type === 'CallExpression' &&
          node.expression.callee.type === 'Identifier' &&
          node.expression.callee.name === 'InjectRepository'
        ) {
          context.report({
            node,
            messageId: 'noInjectRepositoryOutsideServices',
          })
        }
      },
    }
  },
}
