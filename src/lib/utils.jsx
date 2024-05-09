export function formatText(text) {
    return text.split("\n").map((line, index) => <p key={index}>{line}</p>);
}
