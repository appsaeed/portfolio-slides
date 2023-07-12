export const appendTohead = (node: Node) => {
  document.head.appendChild(node);
};
export const loadCSS = () => {
  const link = document.createElement("link");
  link.rel = "stylesheet";
  link.href = "https://cdn.jsdelivr.net/npm/swiper@10/swiper-bundle.min.css";
  appendTohead(link);
};

export const createStyle = (content = "") => {
  const styles = document.createElement("style");
  styles.innerHTML = content;
  appendTohead(styles);
};

export const loadStyles = (style = "") => {
  createStyle(`

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

${style}
`);
};
