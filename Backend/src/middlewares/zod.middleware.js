export const validate = (schema) => (req, res, next) => {
  const result = schema.safeParse(req.body);

  if (!result.success) {
    return res.status(400).json({
      success: false,
      message: result.error.errors[0].message,
      data: null,
      error: result.error.errors,
    });
  }

  // ✅ Clean & validated data
  req.body = result.data;

  next();
};
