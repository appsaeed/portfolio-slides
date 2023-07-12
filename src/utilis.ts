export const appendTohead = (node: Node) => {
  document.getElementsByTagName("head")[0].appendChild(node);
};
export const loadLibCSS = () => {
  const link = document.createElement("link");
  link.href = "https://cdn.jsdelivr.net/npm/swiper@10/swiper-bundle.min.css";
  link.rel = "stylesheet";
  link.type = "text/css";
  // set the media back when the stylesheet loads
  link.onload = function () {
    link.media = "all";
  };
  appendTohead(link);
};

export const loadStyles = () => {
  return `
<style>
  .swiper-slide .title {
    width: 100%;
    background: black;
    color: white;
    font-family: sans-serif;
    text-align: center;
    padding: 7px;
  }

  .swiper-slide img {
    display: block;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
</style>
`;
};

export const later = (timer: number, worker: () => void) => {
  setTimeout(() => {
    worker();
  }, timer);
};
