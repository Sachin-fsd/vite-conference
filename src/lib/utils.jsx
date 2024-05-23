export function formatText(text) {
    return text.split("\n").map((line, index) => <p key={index}>{line}</p>);
}

export function autoResize(e) {
    // console.log(e)
    e.target.style.height = "auto";
    e.target.style.height = e.target.scrollHeight + "px";
  }