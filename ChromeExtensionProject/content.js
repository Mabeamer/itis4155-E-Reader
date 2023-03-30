//import { U_R_L } from '/scripts/notes.js';


const container = document.createElement('div'); //create div
container.id = 'note-overlay-container'; //everything is specifically named to prevent simple overrides.
container.style.cssText = `
  background: rgb(54, 128, 103);
  padding: 20px;
  position: fixed;
  bottom: 40px;
  right: 20px;
  width: 400px;
  height: 200px;
  border-radius: 10px;
  font-family: CerebriSans-Regular, -apple-system, system-ui;
  font-size: 14px;
  box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.3);
  z-index: 20; 
  margin: 10px;
`;

const containerForNote = document.createElement('div'); //create div
containerForNote.id = 'note-content-container'; //everything is specifically named to prevent simple overrides.
containerForNote.style.cssText = `
  background: rgb(54, 128, 103);
  padding: 20px;
  position: fixed;
  bottom: 40px;
  left: 20px;
  width: 200px;
  height: 200px;
  border-radius: 10px;
  font-family: CerebriSans-Regular, -apple-system, system-ui;
  font-size: 14px;
  box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.3);
  z-index: 20; 
  margin: 10px;
`;

const createNote = (text, id, title, onClick) => {
  const div = document.createElement('div');
  const h3 = document.createElement('h3');
  const p = document.createElement('p');
  h3.textContent = title;
  p.textContent = text;
  div.style.cssText =  `
  display: none;
`;
div.id = id;
div.appendChild(h3);
div.appendChild(p);
containerForNote.appendChild(div);
return div;
}

const createNotationButton = (text, top, left, onClick) => { //attrs used below. 
  const button = document.createElement('button'); //make button
  button.innerText = text; 
  button.style.cssText = `
    background: none;
    border: 1px #228B22;
    cursor: pointer;
    font-family: CerebriSans-Regular, -apple-system, system-ui;
    font-size: ${text === '★' ? '20px' : '16px'}; 
    font-weight: ${text === 'X' ? 'bold' : 'normal'};
    position: absolute;
    background-color: #307256;
    box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.25);
    width: 30px;
    border-radius: 5px;
    height: 30px;
    color: ${text === '★' ? '#ffff00' : '#7B1818'};
    top: ${top};
    ${left ? `left: ${left};` : `right: 10px;` }
  `; //in the above text, strict equality and ternary operators (if-else) are used to distinguish between the two symbols while consolidating code.
  button.addEventListener('click', onClick);
  //add exit button code here to minimize application into a smaller window.
  //also add favorite button code here which saves URLs and associates them with webpage titles to each user in a favorites list.
  container.appendChild(button); //appendChild tells the DOM div to display inside div.
 //this will be expanded and iterated on in the future. 
  return button;
};


createNotationButton('★', '10px', '10px', () => {}); //text positions, and the event listeners are empty atm. 
createNotationButton('X', '10px', null, () => {}); //setting to null will put the exit on the right.


//TODO -- add submit button code to submit notes to user's array of notes.
//The above code was the first iteration, and I tried cleaning it up for readability's sake. 

const heading = document.createElement('div');
heading.innerText = `Notes for ${document.title}`; //This will display each URL's "title" for the user.
heading.style.cssText = `
  color: #fff;
  font-family: CerebriSans-Regular, -apple-system, system-ui;
  margin-top: 20px;
`;
container.appendChild(heading);



const textTitlearea = document.createElement('textarea'); //this may be subject to change as it currently is being overridden by page size.
textTitlearea.id = 'notationTitleBox';
textTitlearea.name = 'notationTitleBox';
textTitlearea.rows = 1; 
textTitlearea.cols = 55;
textTitlearea.style.cssText = `
  font-family: CerebriSans-Regular, -apple-system, system-ui;
  padding: 10px;
  background-color: white;
  resize: none;
  overflow: hidden;
`;
textTitlearea.placeholder = 'Enter title here...';
container.appendChild(textTitlearea);



const textarea = document.createElement('textarea'); //this may be subject to change as it currently is being overridden by page size.
textarea.id = 'notationBox';
textarea.name = 'notationBox';
textarea.rows = 5; 
textarea.cols = 55;
textarea.style.cssText = `
  font-family: CerebriSans-Regular, -apple-system, system-ui;
  padding: 10px;
  background-color: white;
  resize: none;
  overflow: hidden;
`;
textarea.placeholder = 'Enter notes here...';
container.appendChild(textarea);

//This needs to be adjusted for Responsive Web Design.

//I may integrate submit into the createNotationButton code at some point in the future, but as of right now, it stays
const notationSubmitButton = document.createElement('button');
notationSubmitButton.innerText = 'Submit';
notationSubmitButton.style.color = '#fff';
notationSubmitButton.style.backgroundColor = '#307256';
notationSubmitButton.style.border = '1px #228B22'; 
notationSubmitButton.style.borderRadius = '5px'; 
notationSubmitButton.style.cursor = 'pointer';
notationSubmitButton.style.boxShadow = '0px 2px 2px rgba(0, 0, 0, 0.25)';
notationSubmitButton.style.fontFamily = 'CerebriSans-Regular, -apple-system, system-ui';
notationSubmitButton.style.fontSize = '14px';
notationSubmitButton.style.position = 'absolute';
notationSubmitButton.style.padding = '5px 10px';
notationSubmitButton.style.bottom = '10px';
notationSubmitButton.style.right = '10px';
notationSubmitButton.addEventListener('click', function(e) {
    //chrome.tabs.query({ active: true, lastFocusedWindow: true }, tabs => {
      let url = `${document.URL}`;
    chrome.storage.sync.get([url], function (items) {
        console.log(items[url]);
        if (typeof items[url] === "undefined") {
            ids = [];
            setNote(url);
        } else {
            ids = JSON.parse(items[url]);
            chrome.storage.sync.remove([url], function () {
                //removes current list of ids so that same url key can be used agin
                console.log("old ids" + ids);
                setNote(url);
            });
        }
    });
  });


 //});

 function placeNote(note, url) {
  let div = document.createElement('div');
  let p = document.createElement('p');
  div.append(p);
  p.textContent = note.note;
  div.classList.add("note");
  notesDiv.append(div);
  let button = document.createElement('button');
  button.addEventListener('click', function (e) {
      chrome.storage.sync.get([url], function (item) {
          let ids = JSON.parse(item[url]);
          ids.splice(ids.indexOf(note.id), 1);
          chrome.storage.sync.remove([url], function () {
              let json = {};
              json[url] = JSON.stringify(ids);
              chrome.storage.sync.set(json, function() {
                  chrome.storage.sync.remove([note.id], function() {
                      e.target.parentElement.replaceChildren();
                  })
              })
          });
      });
  });
  div.append(button);
  button.textContent = "[X]";
  button.classList.add("deletNoteButton");
}

function setNote(url) {
  let verticalScrollOffset = window.pageYOffset;
  console.log(verticalScrollOffset);
  let noteInput = document.querySelector('#notationBox');
  let currentId = Date.now();
  let titleInput = document.querySelector('#notationTitleBox');
  ids.push(currentId.toString());
  let newNote = { note: noteInput.value, id: currentId.toString(), scroll: verticalScrollOffset, title: titleInput.value};
  //placeNote(newNote, url);
  let currentNote = JSON.stringify(newNote);
  let currentIds = JSON.stringify(ids);
  let json = {};
  let json2 = {};
  json[currentId] = currentNote;
  json2[url] = currentIds;
  console.log(json);
  console.log(json2);
  chrome.storage.sync.set(json, function () {
      //stores notes in persistence storage based on id
      chrome.storage.sync.set(json2, function () {
          //stores a list or ids with key url 
          noteInput.textContent = "";
      });
  });
}


var notesAsObjects = [];
var scrollNums = [];
function getNotes() {
    let url = `${document.URL}`;
    chrome.storage.sync.get([url], function (items) {

        if (items[url]) {
            keys = JSON.parse(items[url]);
            console.log(keys);
            chrome.storage.sync.get(keys, function (items) {
                console.log(items);
                keys.forEach(key => {
                    let noteObj = JSON.parse(items[key]);
                    notesAsObjects.push(noteObj);
                    scrollNums.push(noteObj.scroll)
                    createNote(noteObj.note, noteObj.scroll, noteObj.title, () => {});
                })
            });
          }
        
      });
    }

window.addEventListener('load', function() {
  getNotes();
});
window.addEventListener('scroll', function() { 
  scrollNums.forEach(num => {
    if(window.pageYOffset + 500 > num && window.pageYOffset - 500 < num) {
      let element = null;
      containerForNote.childNodes.forEach(child => {
        if (child.id == num) {
        element = child;
      }
     })
     element.classList.add('display');
      element.style.cssText = `
      display: content;
    `;
    } else {
      let element = null;
      containerForNote.childNodes.forEach(child => {
        if (child.id == num) {
          element = child;
        }
       })
       if(element.classList.contains('display')) {
        element.classList.remove('display');
       }
      element.style.cssText = `
      display: none;
    `;
    }
    
  });
  let isNote = false;
  containerForNote.childNodes.forEach(node => {
    if(node.classList.value === 'display') {
      isNote = true;
    }
  })
  if(!isNote) {
    containerForNote.style.cssText = `
    background: rgb(54, 128, 103);
    padding: 20px;
    position: fixed;
    bottom: 40px;
    left: 20px;
    width: 200px;
    height: 200px;
    border-radius: 10px;
    font-family: CerebriSans-Regular, -apple-system, system-ui;
    font-size: 14px;
    box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.3);
    z-index: 20; 
    margin: 10px;
    display: none;
  `;
  } else {
   containerForNote.style.cssText = `
   background: rgb(54, 128, 103);
   padding: 20px;
   position: fixed;
   bottom: 40px;
   left: 20px;
   width: 200px;
   height: 200px;
   border-radius: 10px;
   font-family: CerebriSans-Regular, -apple-system, system-ui;
   font-size: 14px;
   box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.3);
   z-index: 20; 
   margin: 10px;
   display: content;
 `; 
  }
});


//$("html, body").animate({ scrollTop: verticalScrollOffset }, "slow");

 container.appendChild(notationSubmitButton); 

document.body.appendChild(container); //end of document body
document.body.appendChild(containerForNote);

