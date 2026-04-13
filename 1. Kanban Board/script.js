const cards = document.querySelectorAll(".card");
const blocks = document.querySelectorAll(".block");

for (const card of cards) {
    card.addEventListener("dragstart", dragStart);
    card.addEventListener("dragend", dragEnd);
}

for (const block of blocks) {
    block.addEventListener("dragover", dragOver);
    block.addEventListener("dragenter", dragEnter);
    block.addEventListener("dragleave", dragLeave);
    block.addEventListener("drop", drop);
}

function dragStart(e) {
    e.dataTransfer.setData("text/plain", this.id);
}

function dragEnd() {
    console.log("Drag ended");
}

function dragOver(e) {
    e.preventDefault();
}

function dragEnter(e) {
    e.preventDefault();

    this.classList.add("over");
}

function dragLeave() {
    this.classList.remove("over");
}

function drop(e) {
    const id = e.dataTransfer.getData("text/plain");

    const card = document.getElementById(id);

    this.appendChild(card);

    this.classList.remove("over");
}