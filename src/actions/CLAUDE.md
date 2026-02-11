# Server Actions - Guidelines

## Message Keys

**IMPORTANT: NEVER invent message keys. ALWAYS use existing ones.**

### Rules

1. **Check before using**: All message keys used in `ResponseAction` must exist in `src/helpers/messages.ts`
2. **Find existing messages**: Before returning a response, search for appropriate existing messages:
   ```bash
   # Search for messages related to your domain
   grep "ESTIMATION_" src/helpers/messages.ts
   grep "PROJET_" src/helpers/messages.ts
   ```
3. **Don't create new keys in actions**: If you need a new message:
   - First add it to `src/helpers/messages.ts`
   - Then use it in your action
4. **Common message patterns**:
   - Success operations: `{ENTITY}_DELETE`, `{ENTITY}_CREATED`, `{ENTITY}_UPDATED`
   - Errors: `{ENTITY}_DELETE_UNAUTHORIZED`, `{ENTITY}_DOESNT_EXIST`

### Example - WRONG ❌

```typescript
return {
  type: "success",
  message: "ESTIMATION_DELETED", // ❌ This message doesn't exist!
};
```

### Example - CORRECT ✅

```typescript
// 1. First check src/helpers/messages.ts:
// ESTIMATION_DELETE: "Votre estimation a bien été supprimée.",

// 2. Then use the existing key:
return {
  type: "success",
  message: "ESTIMATION_DELETE", // ✅ Existing message
};
```

## ResponseAction Pattern

All server actions must return `ResponseAction<T>`:

```typescript
type ResponseAction<T> = {
  type: "success" | "error";
  message: string; // Must be a key from src/helpers/messages.ts
  // ... additional data
};
```

## Authentication & Authorization

1. **Always check authentication first**:
   ```typescript
   const session = await auth();
   if (!session) {
     return { type: "error", message: "UNAUTHENTICATED" };
   }
   ```

2. **Use PermissionManager for authorization**:
   ```typescript
   const permission = new PermissionManager(session);
   if (!(await permission.canEditProject(projetId))) {
     return { type: "error", message: "UNAUTHORIZED" };
   }
   ```

## Error Handling

Always wrap database operations in try/catch:

```typescript
try {
  const result = await queryFunction(params);
  return { type: "success", message: "SUCCESS_MESSAGE", data: result };
} catch (e) {
  customCaptureException("Error in ActionName", e);
  return { type: "error", message: "TECHNICAL_ERROR" };
}
```
