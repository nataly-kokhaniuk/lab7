'use strict';

const container = document.getElementById('container');
const addBtn = document.getElementById('addBtn');
const removeBtn = document.getElementById('removeBtn');
const styleSelector = document.getElementById('styleSelector');
const valueInput = document.getElementById('valueInput');
const applyChangesBtn = document.getElementById('applyChanges');

addBtn.addEventListener('click', addBlock);
removeBtn.addEventListener('click', removeBlock);
applyChangesBtn.addEventListener('click', applyChanges);

function addBlock() {
  const newSize = prompt("Enter new size (in pixels):");
  const sizes = newSize.split(' '); 
  let newWidth, newHeight;
  newWidth = parseInt(sizes[0]);
  if (sizes.length === 1) newHeight = parseInt(sizes[0]); 
  else if (sizes.length === 2) newHeight = parseInt(sizes[1]);
  else return; 
  
  const newBlock = document.createElement('div');
  newBlock.className = 'block';
  newBlock.style.width = newWidth + 'px';
  newBlock.style.height = newHeight + 'px';
  newBlock.textContent = 'Block ' + (document.querySelectorAll('.block').length + 1);
  let col=  getRandomColor();
  newBlock.style.backgroundColor = col;
  newBlock.addEventListener('click', blockClickHandler);
  
  // Додамо обробники подій для зміни кольору при наведенні на нові та створені блоки
  newBlock.addEventListener('mouseenter', function() {
    newBlock.style.backgroundColor = getRandomColor();
  });
  
  newBlock.addEventListener('mouseleave', function() {
    newBlock.style.backgroundColor = col;
  });
  
  container.appendChild(newBlock);
  
  newBlock.classList.add('fade-in');
  scrollToBottom();
}

function removeBlock() {
    const lastBlock = container.lastChild;
    lastBlock.classList.add('fade-out');
    setTimeout(() => {
        lastBlock.removeEventListener('click', blockClickHandler);
        container.removeChild(lastBlock);
        scrollToTop();
    }, 2000); 
}

function blockClickHandler(event) {
    const rect = event.target.getBoundingClientRect();
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const scrollLeft = window.pageXOffset || document.documentElement.scrollLeft;
    alert(`Block size: ${event.target.offsetWidth}px x ${event.target.offsetHeight}px\nCoordinates: (${rect.left + scrollLeft}px, ${rect.top + scrollTop}px)`);
}

function scrollToBottom() {
    container.scrollTo({
        top: container.scrollHeight,
        behavior: 'smooth',
        block: 'end', 
        inline: 'nearest'
    });
}

function scrollToTop() {
    container.scrollTo({
        top: 0,
        behavior: 'smooth',
        block: 'start', 
        inline: 'nearest'
    });
}

function applyChanges() {
    const selectedStyle = styleSelector.value;
    const newValue = valueInput.value;

    if (selectedStyle === 'fontSize') {
        document.querySelectorAll('.block').forEach(block => {
            block.style.fontSize = newValue + 'px';
        });
    } else if (selectedStyle === 'blockSize') {
        document.querySelectorAll('.block').forEach(block => {
            block.style.width = newValue + 'px';
            block.style.height = newValue + 'px';
        });
    }
}

function getRandomColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}
