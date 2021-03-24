// Add the text to the <span>...<span> element in the element with id=table-title
function updateTableTitle(title) {
  const span = document.createElement('span');
  span.id = `table-${title}`;
  const text = document.createTextNode(title);
  span.appendChild(text);
}

// Add the given <tr>...</tr> element to the table body element with id=rows
function addRowToTable(row) {
  const tbody = document.getElementById('rows');
  tbody.appendChild(row);
}

// Remove all content from the table body element with id=rows
function clearAllTableRows() {
  const myNode = document.getElementById("rows");
  while (myNode.lastElementChild) {
    myNode.removeChild(myNode.lastElementChild);
  }
}

// Creates and returns new table row <tr> element with the specified id value.
function createTableRow(id) {
    const tr = document.createElement('tr');
    tr.value = id;
    return tr;
}

// Given a child element, create a <td> and add this child to it. Return the <td>.
function createTableCell(child) {
  const td = document.createElement('td');
  td.appendChild(child);
  return td;
}

// Wraps a child element in a <td>...</td> and adds it to the table row
function addContentToRow(child, row) {
  if (!child) return;
  const td = document.createElement('td');
  td.appendChild(child);
  row.appendChild(td);
}

// Given a URL src string and alt text string, create an <img> element and return:
// <img src="https://static.inaturalist.org/photos/109319291/square.jpg?1609877680" alt="Muskrat">
function createImg(src, alt) {
  const img = document.createElement('img');
  img.src = src;
  img.alt = alt;
  return img;
}

// Given a string of text, create and return a TextNode
// https://developer.mozilla.org/en-US/docs/Web/API/Document/createTextNode
function createText(text) {
  const textNode = document.createTextNode(text);
  return textNode;
}

// create and return an anchor element.
// <a href="http://en.wikipedia.org/wiki/Muskrat">Muskrat</a>.  NOTE:
// The innerContent will be a TextNode or HTML Img Element (i.e., it
// won't be simple text).
function createAnchor(href, innerContent) {
  console.log(innerContent);
  const a = document.createElement('a');
  a.href = href;
  a.appendChild(innerContent);
  return a;
}

// Return a proper time element with its dateTime property set:
// <time datetime="2020-09-18">2020-09-18</time>
function createTime(formatted) {
  const time = document.createElement('time')
  time.innerHTML = formatted;
  time.setAttribute("datetime",formatted);
  return time;
}

// Given a boolean value (true/false) return a string "Yes" or "No"
function toYesNo(value) {
  return value ? 'Yes' : 'No'
}

// Converts an Observation object into DOM nodes that produce the following HTML:
//
//  <tr id="67868131">
//    <td>
//      <a href="https://www.inaturalist.org/observations/67868131">
//        <img
//          src="https://static.inaturalist.org/photos/109319291/square.jpg?1609877680"
//          alt="Muskrat">
//      </a>
//    </td>
//    <td>
//      <time datetime="2020-09-18">2020-09-18</time>
//    </td>
//    <td>
//      <a href="http://en.wikipedia.org/wiki/Muskrat">Muskrat</a>
//    </td>
//    <td>No</td>
//    <td>Yes</td>
//    <td>No</td>
//    <td>No</td>
//  </tr>
//
// Things to note in your solution:
//
// - Give the table row an id, using the observation's id
// - Create an anchor so you can click the photo and go to the observation's uri
// - Use the observation's name as the alt text of the image, and photoUrl as its src
// - Use a proper <time> element, and format the observation's date using a locale aware format, see
//   https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/toLocaleDateString
// - Use the observation's wikipediaUrl to provide a link when you click the name
// - Convert all the boolean values for endangered, native, threatened, introduced to "Yes" or "No" strings
function buildRowForObservation(observation) {
  // 1. Create the row for this observation with correct id: <tr id="67868131">...</tr>
  const row = createTableRow(observation.id);

  // 2. Create the photo, make it a link to the observation page, and put it in the first cell
  // <img src="https://static.inaturalist.org/photos/109762131/square.jpg?1610308133">
  // TODO: complete the code to create an img element using the other functions
  // in this file, and assign the return value to photo.

  const photo = observation.photoUrl;

  const observationImg = createImg(photo,'');


 
  //3. <a href="https://www.inaturalist.org/observations/67868131">...</a>
  const observationLink = createAnchor(observation.uri, observationImg);
  // <td>...</td>
  addContentToRow(observationLink, row);

  // 4. Create the date and put in the second cell
  const time = createTime(observation.date.toLocaleDateString());
  addContentToRow(time, row);

  // 5. Create the name with a link to its Wikipedia page in the third cell
  const name = createText(observation.name);
  const wikipediaLink = createAnchor(observation.wikipediaUrl, name);
  addContentToRow(wikipediaLink, row);

  // 4-9. Create a Yes/No text cell for each of the characteristics in the array
  ["isEndangered", "isNative", "isThreatened", "isIntroduced"].forEach(
    (characteristic) => {
      const yesNoText = toYesNo(observation[characteristic]);
      const yesNoNode = createText(yesNoText);
      addContentToRow(yesNoNode, row);
    }
  );

  // 10. TODO: replace this with a return of the fully built row for this observation
    return row;
}
