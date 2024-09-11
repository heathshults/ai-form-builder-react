/* eslint-disable @typescript-eslint/no-unused-vars */
import * as React from 'react';
import './dndTest.scss'

interface IDragonDropGrid {
  children?: React.ReactNode
};
interface IDragonDropGridContainer {
  children?: React.ReactNode
  col: number;
  row: number;
};

interface IDragonDropGridCanvas {
  children?: React.ReactNode
  width: number | string;
  height: number | string;
};
const config = {col: 3, row: 3};
const GridStyle = () => {
  return(<>
    <style>
      {`
        .container {
          width: 100%;
          height: 100%;
        }
        .grid-container {
          display: GridCanvas; 
          grid-template-columns: repeat(${config.col}, 1fr); 
          grid-template-rows: repeat(${config.row}, 1fr);
          grid-gap: .75rem;
          grid-auto-flow: row dense;
        }
        .grid-row {
          display: flex;
          flex-direction: row;
          width: 100%;
          height: 100%;
          grid-area: span 1/span 1;
        }
        .grid-item {
          width: 100%;
          height: 100%;
          border: 1px solid #000;
        }
      `}
    </style>
  </>)
}

const GridCanvas = ({children, width, height}: IDragonDropGridCanvas) => {
  return(<>
    <div className="container p-0 m-0">
      {children}
    </div>
  </>)
}


const GridRow = ({ children }: { children: React.ReactNode }) => (
  <div className="grid-row">{children}</div>
);

const GridItem = () => <div className="grid-item"></div>; 

const GridContainer = ({ children, col, row }: IDragonDropGridContainer) => {
  const gridColumns = Array.from({ length: col });
  const gridRows = Array.from({ length: row });
  const dragstartHandler = (e: React.DragEvent<HTMLDivElement>) => {
    e.dataTransfer.setData("text/plain", ev.target.innerText);
    e.dataTransfer.setData("text/html", ev.target.outerHTML);
    e.dataTransfer.setData(
      "text/uri-list",
      e.target.ownerDocument.location.href,
    );
  }
  const handleDragOver = (e) => {
    e.preventDefault();
 };   
 const handleDrop = (e) => {
    e.preventDefault();      
 }
    

  return (
    <>
    <div className="grid-container">
      {gridRows.map((_, rowIndex) => (
        <GridRow key={`row-${rowIndex}`}>
          {gridColumns.map((_, colIndex) => (
            <GridItem key={`col-${colIndex}`} 
              draggable="true" 
              ondragstart={dragstartHandler} 
              onDragOver={handleDragOver}
              onDrop={handleDrop}
            />
          ))}
        </GridRow>
      ))}
    </div>
    </>
  );
};


const DragonDropGrid = ({children}: IDragonDropGrid) => {



  return(<>
    <GridCanvas width={`${100}%`} height={`${100}%`}>
      <GridContainer col={config.col} row={config.row}/>
    </GridCanvas>
      {children}     
  </>)
}
export default DragonDropGrid




























































// import * as React from 'react';
// import './dnd.css';


// const sortable = (section, onUpdate) => {
//   const dragEl, nextEl, newPos, dragGhost;

//   const oldPos = [...section.children].map((item) => {
//     item.draggable = true;
//     const pos = document.getElementById(item.id).getBoundingClientRect();
//     return pos;
//   });

//   function _onDragOver(e) {
//     e.preventDefault();
//     e.dataTransfer.dropEffect = "move";

//     const target = e.target;
//     if (target && target !== dragEl && target.nodeName == "DIV") {
//       if (target.classList.contains("inside")) {
//         e.stopPropagation();
//       } else {
//         //getBoundinClientRect contains location-info about the element (relative to the viewport)
//         const targetPos = target.getBoundingClientRect();
//         //checking that dragEl is dragged over half the target y-axis or x-axis. (therefor the .5)
//         const next =
//           (e.clientY - targetPos.top) / (targetPos.bottom - targetPos.top) >
//             0.5 ||
//           (e.clientX - targetPos.left) / (targetPos.right - targetPos.left) >
//             0.5;
//         section.insertBefore(dragEl, (next && target.nextSibling) || target);

//         /*  console.log("oldPos:" + JSON.stringify(oldPos));
//            console.log("newPos:" + JSON.stringify(newPos)); */
//         /* console.log(newPos.top === oldPos.top ? 'They are the same' : 'Not the same'); */
//         console.log(oldPos);
//       }
//     }
//   }

//   function _onDragEnd(evt) {
//     evt.preventDefault();
//     newPos = [...section.children].map((child) => {
//       const pos = document.getElementById(child.id).getBoundingClientRect();
//       return pos;
//     });
//     console.log(newPos);
//     dragEl.classList.remove("ghost");
//     section.removeEventListener("dragover", _onDragOver, false);
//     section.removeEventListener("dragend", _onDragEnd, false);

//     nextEl !== dragEl.nextSibling ? onUpdate(dragEl) : false;
//   }

//   section.addEventListener("dragstart", function (e) {
//     dragEl = e.target;
//     nextEl = dragEl.nextSibling;
//     /* dragGhost = dragEl.cloneNode(true);
//       dragGhost.classList.add('hidden-drag-ghost'); */

//     /*  document.body.appendChild(dragGhost);
//       e.dataTransfer.setDragImage(dragGhost, 0, 0); */

//     e.dataTransfer.effectAllowed = "move";
//     e.dataTransfer.setData("Text", dragEl.textContent);

//     section.addEventListener("dragover", _onDragOver, false);
//     section.addEventListener("dragend", _onDragEnd, false);

//     setTimeout(function () {
//       dragEl.classList.add("ghost");
//     }, 0);
//   });

//   return(<>
//   <section id="list">
//     <div id='div1' className='divRec'><div className='inside'>item 1</div></div>
//     <div id='div2' className='divQuad'><div className='inside'>item 2</div></div>
//     <div id='div3' className='divRec'><div className='inside'>item 3</div></div>
//     <div id='div4' className='divCard'><div className='inside'>item 4</div></div>
//     <div id='div5' className='divRec'><div className='inside'>item 5</div></div>
//     <div id='div6' className='divQuad'><div className='inside'>item 6</div></div>
//     <div id='div7' className='divCard'><div className='inside'>item 7</div></div>
//     <div id='div8' className='divRec'><div className='inside'>item 8</div></div>
// </section>
//   </>)
// }

// sortable(document.getElementById("list"), function (item) {
//   /* console.log(item); */
// });
export {}