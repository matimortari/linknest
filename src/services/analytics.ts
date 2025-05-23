export const getAnalytics = async () => {
  const res = await fetch("/api/analytics", { method: "GET" });

  return res.json();
};

export const trackClick = async (
  id: number,
  type: "link" | "icon",
  userId: string,
) => {
  const res = await fetch("/api/analytics", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ id, type, userId }),
  });

  return res.json();
};
