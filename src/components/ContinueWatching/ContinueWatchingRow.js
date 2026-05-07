import React from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { selectRecentlyWatched } from "../../redux/continueWatching/continueWatching.selectors";

const TMDB_IMG_BASE = "https://image.tmdb.org/t/p/w300";

export default function ContinueWatchingRow({ onSelect }) {
  const recentlyWatchedRaw = useSelector(selectRecentlyWatched);
  const recentlyWatched = Array.isArray(recentlyWatchedRaw) ? recentlyWatchedRaw : [];
  const history = useHistory();

  if (recentlyWatched.length === 0) return null;

  const handleClick = (item) => {
    if (onSelect) {
      onSelect(item);
    } else {
      history.push("/play", { item });
    }
  };

  return (
    <div className="Row">
      <h3 className="Row__title">Continue Watching</h3>

      <div className="Row__poster--wrp">
        <div className="Row__posters">
          {recentlyWatched.map((item, index) => {
            const key =
              item?.id ||
              item?.movieId ||
              item?._id ||
              `${item?.title || item?.name || "item"}-${index}`;

            const imgSrc = item.poster_path
              ? `${TMDB_IMG_BASE}${item.poster_path}`
              : item.backdrop_path
              ? `${TMDB_IMG_BASE}${item.backdrop_path}`
              : item.posterUrl || item.poster || item.image || "";

            return (
              <img
                key={key}
                className="Row__poster"
                src={imgSrc}
                alt={item.title || item.name || "poster"}
                onClick={() => handleClick(item)}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}