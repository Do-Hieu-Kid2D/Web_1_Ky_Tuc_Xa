// // // Chuyển giữa các tab

// // const $ = c.bind(document);
// // const $$ = document.querySelectorAll.bind(document);

// const tabs = document.querySelectorAll(".tab-item");
// const panes_data = document.querySelectorAll(".tab-pane");
// const panes_list = document.querySelectorAll(".list-pane");

// tabs.forEach((tab, index) => {
//     const tab_item = tabs[index];
//     const pane_data = panes_data[index];
//     const pane_list = panes_list[index];
//     console.log(tabs);
//     tab.onclick = function () {
//         console.log(tab_item);
//         if (tab_item.classList.contains("active")) {
//             tab_item.classList.remove("active");
//         }
//         if (pane_data.classList.contains("active")) {
//             pane_data.classList.remove("active");
//         }
//         if (pane_list.classList.contains("active")) {
//             pane_list.classList.remove("active");
//         }
//         document.querySelector(".tab-pane.active").classList.remove("active");
//         document.querySelector(".list-pane.active").classList.remove("active");

//         // this.classList.add("active");
//         // pane_data.classList.add("active");
//         // pane_list.classList.add("active");
//     };
// });

// const $ = document.querySelector.bind(document);
// const $$ = document.querySelectorAll.bind(document);

// const tabs = $$(".tab-item");
// const panes = $$(".tab-pane");
// const panes_list = $$(".list-pane");


// tabs.forEach((tab, index) => {
//     const pane = panes[index];
//     const list_pane = panes_list[index];

//     tab.onclick = function () {
//         $(".tab-item.active").classList.remove("active");
//         $(".tab-pane.active").classList.remove("active");
//         $(".list-pane.active").classList.remove("active");

//         this.classList.add("active");
//         pane.classList.add("active");
//         list_pane.classList.add("active");
//     };
// });
