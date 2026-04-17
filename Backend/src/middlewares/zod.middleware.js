export const validate = (schema) => (req, res, next) => {
  const result = schema.safeParse(req.body);

  if (!result.success) {
    return res.status(400).json({
      message: result.error.errors[0].message, // 🔥 important
      success: false,
      errors: result.error.errors, // optional (debug ke liye)
    });
  }

  // ✅ Clean & validated data
  req.body = result.data;

  next();
};
