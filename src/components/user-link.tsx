"use client";

import { trackClick } from "@/src/services/analytics";
import { Icon } from "@iconify/react";
import Link from "next/link";
import { useState } from "react";

export default function UserLink({ url, title, preferences, linkId, userId }) {
  const [isHovered, setIsHovered] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(url).then(() => {
      alert("Link copied to clipboard!");
    });
  };

  const handleClick = async () => {
    await trackClick(linkId, "link", userId);
  };

  return (
    <li
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="flex w-full min-w-32 max-w-72 flex-row items-center justify-between px-4 text-center"
      style={{
        backgroundColor: isHovered
          ? preferences?.linkHoverBackgroundColor
          : preferences?.linkBackgroundColor,
        boxShadow: preferences?.isLinkShadow
          ? preferences?.linkShadowWeight === "none"
            ? "none"
            : preferences?.linkShadowWeight === "light"
              ? `0px 1px 2px ${preferences?.linkShadowColor}`
              : preferences?.linkShadowWeight === "medium"
                ? `0 2px 6px ${preferences?.linkShadowColor}`
                : `1px 3px 10px ${preferences?.linkShadowColor}`
          : "none",
        borderRadius: preferences?.linkBorderRadius,
        padding: preferences?.linkPadding,
        transition: "background-color 0.3s ease, box-shadow 0.3s ease",
      }}
    >
      <Link
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className="flex-grow text-center"
      >
        <button onClick={handleClick}>
          <span
            style={{
              color: preferences?.linkTextColor,
              fontWeight: preferences?.linkTextWeight,
              fontSize: preferences?.linkTextSize,
            }}
          >
            {title}
          </span>
        </button>
      </Link>
      {preferences?.showCopyButton && (
        <button onClick={handleCopy} className="ml-2 flex-shrink-0">
          <Icon
            icon="mdi:content-copy"
            width={15}
            height={15}
            style={{ color: preferences?.linkTextColor }}
          />
        </button>
      )}
    </li>
  );
}
