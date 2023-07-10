function adminRequired(req, res, next) {
  try {
    if (req.currentUserRole !== "admin") {
      throw new Error("관리자만 사용 가능합니다.");
    }

    next();
  } catch (error) {
    res.status(403).json({
      result: "forbidden-approach",
      reason: error.message,
    });
  }
}

export { adminRequired };
