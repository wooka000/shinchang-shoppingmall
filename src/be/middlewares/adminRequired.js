function adminRequired(req, res, next) {
  if (req.currentUserRole !== "admin") {
    res.status(403).json({
      result: "forbidden-approach",
      reason: "관리자만 사용가능합니다.",
    });

    return;
  }

  next();
}

export { adminRequired };
