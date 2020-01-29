//"use strict";

document.addEventListener("DOMContentLoaded", init);

//Canvas
var renderer;
var stage;

//UI
var rotDialogSprite;
var inGameUIContainer;
var topUIContainer;
var bottomUIContainer;
var playSprite;
var titleSprite;
var common_dialog_Sprite;
var revive_value;
var tuteContTex;
var tuteContFrame;
var gameOver_lbl;

var cell_grid;
var cell_array;
var cell_type;
var selected_cell = null;
var touch_event;
var grid_cols;
var grid_rows;
var cellwidth = 150;
var cellheight = 150;
var option_buttons_container;
var hamburger_btn;
var delete_btn;
var options_bubble_panel;
var drawer_button;
var cupboard_button;
var empty_shelf_button;
var cuppboard_options_panel;
var Lock_tick;
var Flip_handle_tick;
var total_price = 0;
var cupboard_price = 100;
var drawer_price = 200;
var lock_price = 10;
var backBtn;

var specification_cupboards_count = 0;
var specification_drawers_count = 0;
var specification_locks_count = 0;

var width_ui;
var height_ui;

var MenuButton1;
var MenuButton2;
var MenuButton3;

//LOOP
var tLastFrame = 0;
var tDelta = 0;
var request_Anim_ID;
var isPaused = false;

//GAME
var isGameLoaded = false;
var isInitMenu = false;
var isInitPlay = false;
var isGameOver = false;
var isPlaying = false;

var smoothStep;
var gameTicks = 0;

var isMenu = false;
var isRemoveUI = false;

var isRevive = false;
var tuteFrameID = -1;


var col_input_Main;
var row_input_Main;
var width_input_Main;
var height_input_Main;
var scale_radio_Main;

var col_input_Config;
var row_input_Config;
var width_input_Config;
var height_input_Config;
var scale_radio_Config;

var isInGameView

var isInCm;

const cupboadTypes = {

    DRAWER: 0,
    LOCKER: 1,
    CUSTOM: 2
}

var dimX;
var dimY;

var addToCartBtn;
var cupboards_Array;

var sidepanel_locks_text;
var sidepanel_cupboards_text;
var sidepanel_drawers_text;

var Bubble_btns_container;
var vertical_arrow1, vertical_arrow2;
var horizontal_arrow1, horizontal_arrow2;
var horizontal_dottedline, vertical_dottedline;

var color_btn1, color_btn2, color_btn3;
var specification_color_id = "_b";

var parent_type_id = 0;
var url;
var top_bar_img;
var top_bar_lbl;

const adj_cells = {
    LEFT : -1,
    RIGHT : -1,
    TOP : -1,
    BOTTOM : -1
}

const top_adj_cells = {
    LEFT : -1,
    RIGHT : -1,
    TOP : -1,
    BOTTOM : -1
}

var topmost_nonempty_cell;

const component_data = {

    "top_plate" : {
        "id":"",
        "price":0,
        "count":0
    },

    "bottom_plate" : {
        "id":"",
        "price":0,
        "count":0
    },

    "back_plate" : {
        "id":"",
        "price":0,
        "count":0
    },

    // "side_plate_with_lock_hook" : {
    //     "id":"",
    //     "price":0,
    //     "count":0
    // },

    "side _plate_with_no_lock_hook" : {
        "id":"",
        "price":0,
        "count":0
    },

    // "door_plate_lock_bot" : {
    //     "id":"",
    //     "price":0,
    //     "count":0
    // },

    // "door_plate_lock_top" : {
    //     "id":"",
    //     "price":0,
    //     "count":0
    // },

    "door_plate_no_lock" : {
        "id":"",
        "price":0,
        "count":0
    },

    // "mid_plate_lock" : {
    //     "id":"",
    //     "price":0,
    //     "count":0
    // },

    "mid_plate_no_lock" : {
        "id":"",
        "price":0,
        "count":0
    },

    "side_plate_drawer" : {
        "id":"",
        "price":0,
        "count":0
    },

    "drawer_front_plate" : {
        "id":"",
        "price":0,
        "count":0
    },

    "cover_door_top_bot" : {
        "id":"",
        "price":0,
        "count":0
    },

    "cover_door_middle" : {
        "id":"",
        "price":0,
        "count":0
    },

    "cover_drawer_top_bot" : {
        "id":"",
        "price":0,
        "count":0
    },

    "cover_drawer_middle" : {
        "id":"",
        "price":0,
        "count":0
    },

    "drawer_body" : {
        "id":"",
        "price":0,
        "count":0
    },

    "door_hinge_top_bot" : {
        "id":"",
        "price":0,
        "count":0
    },

    "door_hinge_middle" : {
        "id":"",
        "price":0,
        "count":0
    },

    "side_foot" : {
        "id":"",
        "price":0,
        "count":0
    },

    "middle_foot" : {
        "id":"",
        "price":0,
        "count":0
    },

    "clip_plug" : {
        "id":"",
        "price":0,
        "count":0
    },

    // "lock" : {
    //     "id":"",
    //     "price":0,
    //     "count":0
    // },
///////////////////////////////////////////////////////////
    "L" : {
        "id":"",
        "price":0,
        "count":0
    },

    "C_b":{
        "id":"",
        "price":0,
        "count":0
    },

    "D_b":{
        "id":"",
        "price":0,
        "count":0
    },

    "C_g":{
        "id":"",
        "price":0,
        "count":0
    },

    "D_g":{
        "id":"",
        "price":0,
        "count":0
    },

    "C_p":{
        "id":"",
        "price":0,
        "count":0
    },

    "D_p":{
        "id":"",
        "price":0,
        "count":0
    }
///////////////////////////////////////////////////
};

function init() {

    col_input_Main = document.querySelector('#col_input');
    row_input_Main = document.querySelector('#raw_input');
    width_input_Main = document.querySelector('#width_input');
    height_input_Main = document.querySelector('#heigth_input');
    scale_radio_Main = document.querySelector('#option4');

    col_input_Config = document.querySelector('#col_input_s');
    row_input_Config = document.querySelector('#raw_input_s');
    width_input_Config = document.querySelector('#width_input_s');
    height_input_Config = document.querySelector('#heigth_input_s');
    scale_radio_Config = document.querySelector('#option4_s');
    addToCartBtn = document.querySelector('#addtocartbtn');

    // sidepanel_locks_text = document.querySelector('#locks_txt');
    sidepanel_cupboards_text = document.querySelector('#cupboards_txt');
    sidepanel_drawers_text = document.querySelector('#drawers_txt');

    scale_radio_Main.checked = true;
    grid_cols = col_input_Main.value;
    grid_rows = row_input_Main.value;

    color_btn1 = document.querySelector('#_b');
    color_btn2 = document.querySelector('#_g');
    color_btn3 = document.querySelector('#_p');

    top_bar_img = document.querySelector('#top_img');
    top_bar_lbl = document.querySelector('#top_lbl');

    col_input_Main.addEventListener('input', col_input_Handelr); // register for oninput
    col_input_Main.addEventListener('propertychange', col_input_Handelr); // for IE8

    row_input_Main.addEventListener('input', row_input_Handelr); // register for oninput
    row_input_Main.addEventListener('propertychange', row_input_Handelr); // for IE8

    width_input_Main.addEventListener('input', width_input_Handelr); // register for oninput
    width_input_Main.addEventListener('propertychange', width_input_Handelr); // for IE8

    height_input_Main.addEventListener('input', heigth_input_Handelr); // register for oninput
    height_input_Main.addEventListener('propertychange', heigth_input_Handelr); // for IE8

    col_input_Config.addEventListener('input', col_input_Handelr); // register for oninput
    col_input_Config.addEventListener('propertychange', col_input_Handelr); // for IE8

    row_input_Config.addEventListener('input', row_input_Handelr); // register for oninput
    row_input_Config.addEventListener('propertychange', row_input_Handelr); // for IE8

    width_input_Config.addEventListener('input', width_input_Handelr); // register for oninput
    width_input_Config.addEventListener('propertychange', width_input_Handelr); // for IE8

    height_input_Config.addEventListener('input', heigth_input_Handelr); // register for oninput
    height_input_Config.addEventListener('propertychange', heigth_input_Handelr); // for IE8

    addToCartBtn.addEventListener('click', add_to_cart);

    color_btn1.addEventListener('click', set_color);
    color_btn2.addEventListener('click', set_color);
    color_btn3.addEventListener('click', set_color);
    //scale_radio_Main.addEventListener('change', scale_radio_input_Handelr); // register for oninput

    $(".select-unit-radio").on("change", scale_radio_input_Handelr);
    $(".select-unit-radio2").on("change", scale_radio_input_Handelr);
    console.log(scale_radio_Main);

    isInGameView = false;
    isInCm = true;
}

const row_input_Handelr = function (e) {

    grid_rows = e.target.value;

    if (!isInGameView) {
        row_input_Config.value = grid_rows;
    }
    else {
        create_grid(grid_cols, grid_rows);
    }

    if (isInCm) {
        height_input_Main.value = ((grid_rows * dimY) * 100 | 0) / 100;
        height_input_Config.value = ((grid_rows * dimY) * 100 | 0) / 100;
    }
    else {
        height_input_Main.value = ((grid_rows * dimY * 0.393701) * 100 | 0) / 100;
        height_input_Config.value = ((grid_rows * dimY * 0.393701) * 100 | 0) / 100;
    }

}

const col_input_Handelr = function (e) {

    grid_cols = e.target.value;

    if (!isInGameView) {
        col_input_Config.value = grid_cols;
    }
    else {
        create_grid(grid_cols, grid_rows);
    }

    if (isInCm) {
        width_input_Main.value = ((grid_cols * dimX) * 100 | 0) / 100;
        width_input_Config.value = ((grid_cols * dimX) * 100 | 0) / 100;
    }
    else {
        width_input_Main.value = ((grid_cols * dimX * 0.393701) * 100 | 0) / 100;
        width_input_Config.value = ((grid_cols * dimX * 0.393701) * 100 | 0) / 100;
    }

}

const width_input_Handelr = function (e) {

    if (isInCm) {
        grid_cols = e.target.value;

    }
    else {
        grid_cols = e.target.value * 2.54;
    }

    grid_cols /= dimX;
    grid_cols |= 0;

    if (!isInGameView) {
        width_input_Config.value = e.target.value;
    }
    else {
        create_grid(grid_cols, grid_rows);
    }

    //set col val
    col_input_Main.value = grid_cols;
    col_input_Config.value = grid_cols;

}

const heigth_input_Handelr = function (e) {

    if (isInCm) {
        grid_rows = e.target.value;
    }
    else {
        grid_rows = e.target.value * 2.54;
    }

    grid_rows /= dimY;
    grid_rows |= 0;

    if (!isInGameView) {
        height_input_Config.value = e.target.value;
    }
    else {
        create_grid(grid_cols, grid_rows);
    }

    //set row val
    row_input_Main.value = grid_rows;
    row_input_Config.value = grid_rows;

}

const scale_radio_input_Handelr = function (e) {

    if (e.target.value == "1") {

        console.log("RADIO CM");
        isInCm = true;

    }
    else {

        console.log("RADIO IN");
        isInCm = false;

    }

    if (!isInGameView) {

        $(".select-unit-radio2").val([e.target.value]);
        $(".select-unit-radio2").closest("label").removeClass("active");
        $("[name='options2'][value='" + e.target.value + "']").closest("label").addClass("active");

        if (isInCm) {
            height_input_Main.value = (((grid_rows * dimY) * 100) | 0) / 100;
            width_input_Main.value = (((grid_cols * dimX) * 100) | 0) / 100;
            height_input_Config.value = (((grid_rows * dimY) * 100) | 0) / 100;
            width_input_Config.value = (((grid_cols * dimX) * 100) | 0) / 100;

        }
        else {
            height_input_Main.value = (((grid_rows * dimY * 0.393701) * 100) | 0) / 100;
            width_input_Main.value = (((grid_cols * dimX * 0.393701) * 100) | 0) / 100;
            height_input_Config.value = (((grid_rows * dimY * 0.393701) * 100) | 0) / 100;
            width_input_Config.value = (((grid_cols * dimX * 0.393701) * 100) | 0) / 100;

        }
    }
    else {

        if (isInCm) {
            height_input_Config.value = (((grid_rows * dimY) * 100) | 0) / 100;
            width_input_Config.value = (((grid_cols * dimX) * 100) | 0) / 100;

        }
        else {
            height_input_Config.value = (((grid_rows * dimY * 0.393701) * 100) | 0) / 100;
            width_input_Config.value = (((grid_cols * dimX * 0.393701) * 100) | 0) / 100;

        }

    }
    if (isInGameView) {
        update_Length_text();
    }
}

//Init==================
function initCanvas() {
    
    revive_value = 10;

    renderer = PIXI.autoDetectRenderer(1024, 1024, { antialis: false, transparent: false, resolution: 1, backgroundColor: 0xf2f2f2, preserveDrawingBuffer: setDevice() });
    renderer.autoResize = true;
    PIXI.settings.SCALE_MODE = PIXI.SCALE_MODES.NEAREST;
    PIXI.settings.PRECISION_FRAGMENT = PIXI.PRECISION.HIGH;

    stage = new PIXI.Container();

    renderer.render(stage);

    document.getElementById("game").appendChild(renderer.view);

    window.onresize = resize;

    resize();

    //Load Assets
    PIXI.loader
        .add([
            "images/intro.png",
            "images/objects_spritesheet.png",
        ])
        .on("progress", loadHandler)
        .on('complete', loadComplete)
        .load(setup);

    var graphics = new PIXI.Graphics();

    stage.addChild(graphics);

    var LoadingIconTex;
    var LoadingIconSprite;

    function loadHandler(loader, res) {

        resize();

        if (res.url === 'images/intro.png') {

            LoadingIconTex = PIXI.loader.resources['images/intro.png'].texture;
            LoadingIconSprite = new PIXI.Sprite(LoadingIconTex);
            LoadingIconSprite.y = 150;
            LoadingIconSprite.x = 188;

            stage.addChild(LoadingIconSprite);

        }

        graphics.clear();

        graphics.beginFill(0x3333ff, 1);

        graphics.drawRect(163, 400, loader.progress * 2.5, 10);

        graphics.endFill();

        graphics.beginFill(0x3333ff, 0);

        graphics.lineStyle(2, 0xffffff, 1);

        graphics.drawRect(163, 400, 250, 10);

        graphics.endFill();

    }

    function loadComplete(loader, res) {

        stage.removeChild(graphics);
        stage.removeChild(LoadingIconSprite);
        //Keep for GC to clean !!!

    }

    function setup() {
        
        
        var gameobject_atlas = PIXI.loader.resources["images/objects_spritesheet.png"].texture;


        let btn1Tex = new PIXI.Texture(gameobject_atlas);
        btn1Tex.frame = new PIXI.Rectangle(8, 760, 243, 243);
        MenuButton1 = new PIXI.Sprite(btn1Tex);
        MenuButton1.anchor.set(0.5, 0);
        MenuButton1.x = 256;
        MenuButton1.interactive = true;
        MenuButton1.on('pointerdown', pick_type_show_modal_window);
        MenuButton1.type = 1;

        let btn2Tex = new PIXI.Texture(gameobject_atlas);
        btn2Tex.frame = new PIXI.Rectangle(252, 760, 243, 243);
        MenuButton2 = new PIXI.Sprite(btn2Tex);
        MenuButton2.anchor.set(0.5, 0);
        MenuButton2.x = 512;
        MenuButton2.interactive = true;
        MenuButton2.on('pointerdown', pick_type_show_modal_window);
        MenuButton2.type = 0;

        let btn3Tex = new PIXI.Texture(gameobject_atlas);
        btn3Tex.frame = new PIXI.Rectangle(497, 760, 243, 243);
        MenuButton3 = new PIXI.Sprite(btn3Tex);
        MenuButton3.anchor.set(0.5, 0);
        MenuButton3.x = 768;
        MenuButton3.interactive = true;
        MenuButton3.on('pointerdown', pick_type_show_modal_window);
        MenuButton3.type = 2;

        topUIContainer = new PIXI.Container();
        //topUIContainer.addChild(MenuButton1);
        //topUIContainer.addChild(MenuButton2);
        //topUIContainer.addChild(MenuButton3);
        stage.addChild(topUIContainer);
        topUIContainer.y = 412;

        inGameUIContainer = new PIXI.Container();
        let backbtnTex = new PIXI.Texture(gameobject_atlas);
        backbtnTex.frame = new PIXI.Rectangle(190, 240, 35, 35);
        backBtn = new PIXI.Sprite(backbtnTex);
        backBtn.x = 10;
        backBtn.y = 10;
        backBtn.interactive = false;
        backBtn.on('pointerdown', on_backbutton_clicked);
        // inGameUIContainer.addChild(backBtn);

        width_ui = new PIXI.Text("width", { align: 'center' });
        height_ui = new PIXI.Text("height", { align: 'center' });

        let delete_btnTex = new PIXI.Texture(gameobject_atlas);
        delete_btnTex.frame = new PIXI.Rectangle(50, 240, 30, 30);
        delete_btn = new PIXI.Sprite(delete_btnTex);
        delete_btn.interactive = true;
        delete_btn.on('pointerdown', on_delete_btn_clicked);

        let hamburger_btnTex = new PIXI.Texture(gameobject_atlas);
        hamburger_btnTex.frame = new PIXI.Rectangle(12, 240, 30, 30);
        hamburger_btn = new PIXI.Sprite(hamburger_btnTex);
        hamburger_btn.interactive = true;
        hamburger_btn.on('pointerdown', () => {
            options_bubble_panel.alpha = 0;
            options_bubble_panel.isfade_in = true;
            options_bubble_panel.animticker = 0;
            options_bubble_panel.visible = true;
            cuppboard_options_panel.visible = false;
            Lock_tick.texture.frame.x = 120;
            Lock_tick.ticked = 1;
            Flip_handle_tick.texture.frame.x = 120;
            Flip_handle_tick.ticked = 1;

            if (selected_cell.iscupboard === 1) {
                cuppboard_options_panel.visible = true;
            }

            if (selected_cell.haslock === 1) {
                Lock_tick.texture.frame.x = 150;
                Lock_tick.ticked = 1;
            } else if (selected_cell.haslock === 0) {
                Lock_tick.texture.frame.x = 120;
                Lock_tick.ticked = -1;
            }

            if (selected_cell.flipped === 1) {
                Flip_handle_tick.texture.frame.x = 150;
                Flip_handle_tick.ticked = -1;
            } else if (selected_cell.flipped === 0) {
                Flip_handle_tick.texture.frame.x = 120;
                Flip_handle_tick.ticked = 1;
            }

            Lock_tick.texture._updateUvs();
            Flip_handle_tick.texture._updateUvs();

            if (option_buttons_container.y < 200) {
                options_bubble_panel.rotation = 3.14
                Bubble_btns_container.rotation = 3.14
                Bubble_btns_container.y = -343;
                closeBtn.position.set(-120, -60)
            }
            else {
                options_bubble_panel.rotation = 0;
                Bubble_btns_container.rotation = 0;
                Bubble_btns_container.y = 0;
                closeBtn.position.set(100, -310);
            }

        });
        hamburger_btn.x = 10;
        hamburger_btn.y = 10;

        option_buttons_container = new PIXI.Container();
        option_buttons_container.addChild(hamburger_btn);
        option_buttons_container.addChild(delete_btn);
        delete_btn.y = 10;
        delete_btn.x = 40;

        let options_bubble_panelTex = new PIXI.Texture(gameobject_atlas);
        options_bubble_panelTex.frame = new PIXI.Rectangle(12, 280, 271, 313);
        options_bubble_panel = new PIXI.Sprite(options_bubble_panelTex);
        options_bubble_panel.visible = false;
        options_bubble_panel.interactive = true;
        options_bubble_panel.anchor.set(0.5, 1);
        options_bubble_panel.animticker = 0;
        options_bubble_panel.isfade_in = false;
        options_bubble_panel.isfade_out = false;

        Bubble_btns_container = new PIXI.Container();


        let drawer_graphic = new PIXI.Graphics();
        drawer_graphic.beginFill(0Xe8e8e8);
        drawer_graphic.drawRect(0, 0, 200, 40);
        drawer_graphic.endFill();
        let drawerTex = renderer.generateTexture(drawer_graphic);
        drawer_button = new PIXI.Sprite(drawerTex);
        let drawer_label = new PIXI.Text("Drawer");
        drawer_button.addChild(drawer_label);
        Bubble_btns_container.addChild(drawer_button);
        drawer_button.position.set(-100, -230);
        drawer_button.interactive = true;

        drawer_button.on('pointerdown', on_drawer_option_clicked);

        empty_shelf_button = new PIXI.Sprite(drawerTex);
        let empty_label = new PIXI.Text("Empty");
        empty_shelf_button.addChild(empty_label);
        empty_shelf_button.position.set(-100, -280);
        empty_shelf_button.interactive = true;
        empty_shelf_button.on('pointerdown', on_shelf_option_clicked);
        Bubble_btns_container.addChild(empty_shelf_button);

        cupboard_button = new PIXI.Sprite(drawerTex);
        cupboard_button.position.set(-100, -180);
        cupboard_button.interactive = true;
        cupboard_button.on('pointerdown', on_cupboard_option_clicked);
        let cupboard_label = new PIXI.Text("Cupboard");
        cupboard_button.addChild(cupboard_label);
        Bubble_btns_container.addChild(cupboard_button);

        let cupboard_panel_graphic = new PIXI.Graphics();
        cupboard_panel_graphic.beginFill(0Xe8e8e8);
        cupboard_panel_graphic.drawRect(0, 0, 200, 75);
        cupboard_panel_graphic.endFill();

        let cupboardpanelTex = renderer.generateTexture(cupboard_panel_graphic);
        cuppboard_options_panel = new PIXI.Sprite(cupboardpanelTex);
        Bubble_btns_container.addChild(cuppboard_options_panel);
        cuppboard_options_panel.position.set(-100, -140);
        cuppboard_options_panel.visible = false;

        let tickTex = new PIXI.Texture(gameobject_atlas);
        tickTex.frame = new PIXI.Rectangle(120, 240, 21, 21);

        Lock_tick = new PIXI.Sprite(tickTex);
        // cuppboard_options_panel.addChild(Lock_tick);
        Lock_tick.position.set(10, 8);
        let lock_lbl = new PIXI.Text("Lock");
        // cuppboard_options_panel.addChild(lock_lbl);
        lock_lbl.position.set(32, 8);
        Lock_tick.ticked = 1;
        Lock_tick.interactive = true;
        Lock_tick.on('pointerdown', () => {
            Lock_tick.ticked *= -1;
            if (Lock_tick.ticked === -1) { //remove lock
                Lock_tick.texture.frame.x = 120;
                selected_cell.texture.frame.x += 112;
                selected_cell.haslock = 0;

                component_data["lock"].count -= 1;
                component_data["door_plate_lock_bot"].count -= 1;
                component_data["door_plate_lock_bot"].count = component_data["door_plate_lock_bot"].count <0 ? 0 : component_data["door_plate_lock_bot"].count;
                component_data["door_plate_no_lock"].count += 1;

                component_data["mid_plate_lock"].count -= 1;
                component_data["mid_plate_lock"].count = component_data["mid_plate_lock"].count < 0 ? 0 : component_data["mid_plate_lock"].count;
                component_data["mid_plate_no_lock"].count += 1;

            } else if (Lock_tick.ticked === 1) { // add lock
                Lock_tick.texture.frame.x = 150;
                selected_cell.texture.frame.x -= 112;
                selected_cell.haslock = 1;

                component_data["lock"].count += 1;
                component_data["door_plate_lock_bot"].count += 1;
                component_data["door_plate_no_lock"].count -= 1;
                component_data["door_plate_no_lock"].count = component_data["door_plate_no_lock"].count <0 ? 0 : component_data["door_plate_no_lock"].count;

                component_data["mid_plate_lock"].count += 1;
                component_data["mid_plate_no_lock"].count -= 1;
                component_data["mid_plate_no_lock"].count = component_data["mid_plate_no_lock"].count < 0? 0 : component_data["mid_plate_no_lock"].count;
            }
            
            get_updated_price();
            selected_cell.texture._updateUvs();
            Lock_tick.texture._updateUvs();
        });

        let tickTex2 = new PIXI.Texture(gameobject_atlas);
        tickTex2.frame = new PIXI.Rectangle(120, 240, 21, 21);

        Flip_handle_tick = new PIXI.Sprite(tickTex2);
        cuppboard_options_panel.addChild(Flip_handle_tick);
        Flip_handle_tick.position.set(10, 40);
        let flip_lbl = new PIXI.Text("Flip Handle");
        cuppboard_options_panel.addChild(flip_lbl);
        flip_lbl.position.set(32, 40);
        Flip_handle_tick.ticked = 1;
        Flip_handle_tick.interactive = true;
        Flip_handle_tick.on('pointerdown', on_flipHandle_tick_checked);

        let bubblecloseTex = new PIXI.Texture(gameobject_atlas);
        bubblecloseTex.frame = new PIXI.Rectangle(90, 240, 23, 23);
        var closeBtn = new PIXI.Sprite(bubblecloseTex);
        options_bubble_panel.addChild(closeBtn);
        closeBtn.position.set(100, -250);
        closeBtn.interactive = true;
        closeBtn.on('pointerdown', () => {
            options_bubble_panel.alpha = 1;
            options_bubble_panel.animticker = 1;
            options_bubble_panel.isfade_out = true;
        });
        options_bubble_panel.addChild(Bubble_btns_container);

        option_buttons_container.addChild(options_bubble_panel);
        options_bubble_panel.position.set(hamburger_btn.x, hamburger_btn.y)

        cell_grid = new PIXI.Container();
        stage.addChild(cell_grid);

        cell_array = [];
        for (let index = 0; index < 900; index++) {
            let cellTex = new PIXI.Texture(gameobject_atlas);
            cellTex.frame = new PIXI.Rectangle(8, 120, 100, 100);
            let cell = new PIXI.Sprite(cellTex);
            cell.interactive = true;
            cell.on('mousedown', oncellPicked);
            cell.iscupboard = 0;
            cell.isdrawer = 0;
            cell.haslock = 0;
            cell.isshelf = 0;
            cell.addChild(new PIXI.Text(index));
            cell_array.push(cell);
        }

        let arrowTex = new PIXI.Texture(gameobject_atlas);
        arrowTex.frame = new PIXI.Rectangle(397, 49, 14, 14);

        vertical_arrow1 = new PIXI.Sprite(arrowTex);
        vertical_arrow1.anchor.set(0.5);
        vertical_arrow1.rotation = 4.71;
        vertical_arrow2 = new PIXI.Sprite(arrowTex);
        vertical_arrow2.anchor.set(0.5);
        vertical_arrow2.rotation = 1.57;
        horizontal_arrow1 = new PIXI.Sprite(arrowTex);
        horizontal_arrow1.anchor.set(0.5);
        horizontal_arrow1.rotation = 3.14;
        horizontal_arrow2 = new PIXI.Sprite(arrowTex);
        horizontal_arrow2.anchor.set(0.5);

        let dotlineTex = new PIXI.Texture(gameobject_atlas);
        dotlineTex.frame = new PIXI.Rectangle(412, 51, 13, 6);

        horizontal_dottedline = new PIXI.extras.TilingSprite(dotlineTex, 13, 6);
        horizontal_dottedline.anchor.set(0, 0.5);
        vertical_dottedline = new PIXI.extras.TilingSprite(dotlineTex, 13, 6);
        vertical_dottedline.anchor.set(0, 0.5);
        vertical_dottedline.rotation = 4.71;

        stage.addChild(horizontal_dottedline);
        stage.addChild(vertical_dottedline);

        stage.addChild(vertical_arrow1);
        stage.addChild(vertical_arrow2);
        stage.addChild(horizontal_arrow1);
        stage.addChild(horizontal_arrow2);

        isGameLoaded = true;
        open_main_menu();
        // create_grid(cellwidth,cellheight,grid_cols,grid_rows);

        resize();

    }

}

//Servives==============

//UTIL================
function resize() {

    var innerWidth = document.getElementById("game").clientWidth;
    var innerHeight = document.getElementById("game").clientHeight;

    var ratio = 1;
    var w = 0;
    var h = 0;

    if (innerWidth / innerHeight >= ratio) {
        w = innerHeight * ratio;
        h = innerHeight;
    } else {
        w = innerWidth;
        h = innerWidth / ratio;
    }

    renderer.view.style.width = w + 'px';
    renderer.view.style.height = h + 'px';

    var y = (innerHeight - h) * 0.5;
    var x = (innerWidth - w) * 0.5;

    // renderer.view.style.padding = y + "px " + x + "px";
    renderer.view.style.margin = y + "px " + x + "px";

}

function setDevice() {

    var dataOb;

    (function () {
        {

            var unknown = '-';



            var nVer = navigator.appVersion;
            var nAgt = navigator.userAgent;

            // system
            var os = unknown;
            var clientStrings = [
                { s: 'Windows 10', r: /(Windows 10.0|Windows NT 10.0)/ },
                { s: 'Windows 8.1', r: /(Windows 8.1|Windows NT 6.3)/ },
                { s: 'Windows 8', r: /(Windows 8|Windows NT 6.2)/ },
                { s: 'Windows 7', r: /(Windows 7|Windows NT 6.1)/ },
                { s: 'Windows Vista', r: /Windows NT 6.0/ },
                { s: 'Windows Server 2003', r: /Windows NT 5.2/ },
                { s: 'Windows XP', r: /(Windows NT 5.1|Windows XP)/ },
                { s: 'Windows 2000', r: /(Windows NT 5.0|Windows 2000)/ },
                { s: 'Windows ME', r: /(Win 9x 4.90|Windows ME)/ },
                { s: 'Windows 98', r: /(Windows 98|Win98)/ },
                { s: 'Windows 95', r: /(Windows 95|Win95|Windows_95)/ },
                { s: 'Windows NT 4.0', r: /(Windows NT 4.0|WinNT4.0|WinNT|Windows NT)/ },
                { s: 'Windows CE', r: /Windows CE/ },
                { s: 'Windows 3.11', r: /Win16/ },
                { s: 'Android', r: /Android/ },
                { s: 'Open BSD', r: /OpenBSD/ },
                { s: 'Sun OS', r: /SunOS/ },
                { s: 'Linux', r: /(Linux|X11)/ },
                { s: 'iOS', r: /(iPhone|iPad|iPod)/ },
                { s: 'Mac OS X', r: /Mac OS X/ },
                { s: 'Mac OS', r: /(MacPPC|MacIntel|Mac_PowerPC|Macintosh)/ },
                { s: 'QNX', r: /QNX/ },
                { s: 'UNIX', r: /UNIX/ },
                { s: 'BeOS', r: /BeOS/ },
                { s: 'OS/2', r: /OS\/2/ },
                { s: 'Search Bot', r: /(nuhk|Googlebot|Yammybot|Openbot|Slurp|MSNBot|Ask Jeeves\/Teoma|ia_archiver)/ }
            ];
            for (var id in clientStrings) {
                var cs = clientStrings[id];
                if (cs.r.test(nAgt)) {
                    os = cs.s;
                    break;
                }
            }

            var osVersion = unknown;

            if (/Windows/.test(os)) {
                osVersion = /Windows (.*)/.exec(os)[1];
                os = 'Windows';
            }

            switch (os) {
                case 'Mac OS X':
                    osVersion = /Mac OS X (10[\.\_\d]+)/.exec(nAgt)[1];
                    break;

                case 'Android':
                    osVersion = /Android ([\.\_\d]+)/.exec(nAgt)[1];
                    break;

                case 'iOS':
                    osVersion = /OS (\d+)_(\d+)_?(\d+)?/.exec(nVer);
                    osVersion = osVersion[1] + '.' + osVersion[2] + '.' + (osVersion[3] | 0);
                    break;
            }


        }

        dataOb = {
            os: os,
            osVersion: osVersion
        };

    }());


    if (dataOb.os == "Android") {
        if (dataOb.osVersion < '6.0') {
            return true;
        } else {

            return false;
        }
    } else {

        return false;
    }
}

function onAppPause(status) {

    if (status) {

        if (isPaused) {
            tLastFrame = performance.now();
            game_update(tLastFrame);
            isPaused = false;
        }

    }
    else if (request_Anim_ID) {

        if (!isPaused) {
            //console.log("request_Anim_ID..." + request_Anim_ID);
            cancelAnimationFrame(request_Anim_ID);
            isPaused = true;
        }

    }

}


function StartGameLoop(state) {

    isInGameView = state;

    if (state) {
        tLastFrame = performance.now();
        game_update(tLastFrame);
    }
    else if (request_Anim_ID) {
        cancelAnimationFrame(request_Anim_ID);
    }

}

//Game Loop
function game_update(tFrame) {

    tDelta = tFrame - tLastFrame;
    request_Anim_ID = requestAnimationFrame(game_update);

    if (isGameLoaded) {

        if (isRevive) {

            //gameTicks++;

            gameTicks += (tDelta * 0.06);
            gameTicks = gameTicks > 10 ? 10 : gameTicks;

            smoothStep = gameTicks * 0.1;
            smoothStep = 3 * smoothStep * smoothStep - 2 * smoothStep * smoothStep * smoothStep;

            //common_dialog_Sprite.position.set(88, 1200);//700
            common_dialog_Sprite.y = 1200 - 500 * smoothStep;

            if (gameTicks === 10) {

                common_dialog_Sprite.y = 700;
                isRevive = false;

            }


        }
        else if (isGameOver) {

            gameTicks += (tDelta * 0.06);
            gameTicks = gameTicks > 10 ? 10 : gameTicks;

            smoothStep = gameTicks * 0.1;
            smoothStep = 3 * smoothStep * smoothStep - 2 * smoothStep * smoothStep * smoothStep;

            gameOver_lbl.y = -600 + 800 * smoothStep;

            if (gameTicks === 10) {

                gameOver_lbl.y = 200;//-600

                isGameOver = false;
            }

        }
        else if (isInitMenu) {

            gameTicks += (tDelta * 0.06);
            gameTicks = gameTicks > 10 ? 10 : gameTicks;

            smoothStep = gameTicks * 0.1;
            smoothStep = 3 * smoothStep * smoothStep - 2 * smoothStep * smoothStep * smoothStep;

            // playSprite.y = -300 + 840 * smoothStep;
            // titleSprite.y = -200 + 556 * smoothStep;
            // bottomUIContainer.y = 1050 - 250 * smoothStep;
            topUIContainer.alpha = smoothStep;

            if (gameTicks === 10) {

                // playSprite.y = 540;//-300
                // titleSprite.y = 356;//-200
                // bottomUIContainer.y = 800;//1050
                topUIContainer.alpha = 1;//-200

                isInitMenu = false;
                gameTicks = 0;

                isRemoveUI = true;
            }

        }
        else if (isMenu) {

            // gameTicks += (tDelta * 0.06);
            // gameTicks = gameTicks > 50 ? 50 : gameTicks;

            // smoothStep = gameTicks * 0.02;
            // smoothStep = 3 * smoothStep * smoothStep - 2 * smoothStep * smoothStep * smoothStep;

        }
        else if (isRemoveUI) {

            gameTicks += (tDelta * 0.06);
            gameTicks = gameTicks > 10 ? 10 : gameTicks;

            smoothStep = gameTicks * 0.1;
            smoothStep = 3 * smoothStep * smoothStep - 2 * smoothStep * smoothStep * smoothStep;

            // playSprite.y = 540 - 840 * smoothStep;//-300 + 840 * smoothStep;
            // titleSprite.y = 356 - 556 * smoothStep;//-200 + 556 * smoothStep;
            // bottomUIContainer.y = 800 + 250 * smoothStep;//1050 - 250 * smoothStep;
            topUIContainer.alpha = 1 - smoothStep;//-200 + 200 * smoothStep;

            if (gameTicks === 10) {

                // playSprite.alpha = 0;
                // titleSprite.y = -200;
                // bottomUIContainer.y = 1050;
                topUIContainer.alpha = 0;
                topUIContainer.visible = false;
                create_grid(grid_cols, grid_rows);
                stage.addChild(inGameUIContainer);
                inGameUIContainer.alpha = 0;
                cell_grid.alpha = 0;

                isRemoveUI = false;
                gameTicks = 0;
                isInitPlay = true;

            }

        }
        else if (isInitPlay) {

            gameTicks += (tDelta * 0.06);
            gameTicks = gameTicks > 10 ? 10 : gameTicks;

            smoothStep = gameTicks * 0.1;
            smoothStep = 3 * smoothStep * smoothStep - 2 * smoothStep * smoothStep * smoothStep;

            cell_grid.alpha = smoothStep;
            inGameUIContainer.alpha = smoothStep;
            if (gameTicks === 10) {
                // stage.addChild(Debug_SCORE_ButtonSprite);
                // stage.addChild(Debug_END_ButtonSprite);
                inGameUIContainer.alpha = 1;
                backBtn.interactive = true;
                isInitPlay = false;
                gameTicks = 0;
                isPlaying = true;
            }

        }
        else if (isPlaying) {
            //console.log("IN GAME LOOP");
            //#region Fading animations
            if (options_bubble_panel.isfade_in) {
                options_bubble_panel.animticker += 0.1 * 0.06 * tDelta;
                options_bubble_panel.animticker = options_bubble_panel.animticker > 1 ? 1 : options_bubble_panel.animticker;
                options_bubble_panel.alpha = options_bubble_panel.animticker;

                if (options_bubble_panel.animticker === 1) {
                    options_bubble_panel.alpha = 1;
                    options_bubble_panel.isfade_in = false;
                }
            }

            if (options_bubble_panel.isfade_out) {
                options_bubble_panel.animticker -= 0.1 * 0.06 * tDelta;
                options_bubble_panel.animticker = options_bubble_panel.animticker < 0 ? 0 : options_bubble_panel.animticker;
                options_bubble_panel.alpha = options_bubble_panel.animticker;

                if (options_bubble_panel.animticker === 0) {
                    options_bubble_panel.alpha = 0;
                    options_bubble_panel.visible = false;
                    options_bubble_panel.isfade_out = false;
                }
            }
            //#endregion
        }
        //Animation
    }

    tLastFrame = tFrame;
    renderer.render(stage);

}

function create_grid(cols, rows) { //*******************call when new values are added from input fields********************** */

    clear_grid();
    cupboards_Array = [];

    cellwidth = 150;
    cellheight = 150;

    if (cols > rows) {
        let total_length = cellwidth * cols;
        total_length = total_length > 800 ? 800 : total_length;

        cellwidth = total_length / cols;
        cellheight = cellwidth;
    } else {
        let total_height = cellwidth * rows;
        total_height = total_height > 800 ? 800 : total_height;

        cellheight = total_height / rows;
        cellwidth = cellheight;
    }

    //    clear_grid();
    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
            let cell = cell_array[i * cols + j];
            cell.texture.frame.x = 112 * cell_type + 8;
            cell.texture._updateUvs();
            cell.x = j * cellwidth;
            cell.y = i * cellheight;
            cell.width = cellwidth;
            cell.height = cellheight;
            cell.visible = true;
            cell.alpha = 1;
            cell.ID = (i * cols + j);
            // console.log(cell.ID+", ");
            cupboards_Array[i * cols + j] = new PIXI.Container();
            cupboards_Array[i * cols + j].isempty = false;
            cupboards_Array[i * cols + j].grid_cell = cell;
            switch (cell_type) {
                case cupboadTypes.LOCKER: //cupboard
                    cell.interactive = false;
                    break;

                case cupboadTypes.DRAWER: //drawer
                    cell.interactive = false;
                    break;

                case cupboadTypes.CUSTOM: //custom
                    cell.iscupboard = 1;
                    cell.isdrawer = 0;
                    cell.haslock = 0;
                    cell.flipped = 0;
                    cell.interactive = true;
                    break;

            }
            cell_grid.addChild(cell);
        }
    }

    if (cell_grid.width > cell_grid.height) {
        let ratio = cell_grid.height / cell_grid.width;
        cell_grid.width = cell_grid.width > 900 ? 900 : cell_grid.width;
        cell_grid.height = cell_grid.width * ratio;
    }

    else {
        let ratio = cell_grid.width / cell_grid.height;
        cell_grid.height = cell_grid.height > 900 ? 900 : cell_grid.height;
        cell_grid.width = cell_grid.height * ratio;
    }

    console.log("width " + cell_grid.width + ", height" + cell_grid.height);

    cell_grid.x = 512 - cell_grid.width * 0.5;
    cell_grid.y = 512 - cell_grid.height * 0.5;

    cell_grid.addChild(option_buttons_container);
    option_buttons_container.x = -1024;

    //default components for any cells
    component_data["bottom_plate"].count = rows * cols;
    component_data["back_plate"].count = rows * cols;
    component_data["top_plate"].count = cols;
    component_data["side_foot"].count = 4;
    component_data["middle_foot"].count = 2*(cols - 1);

    switch (cell_type) {
        case 0: //drawers
            component_data["side_plate_drawer"].count = 2*rows*cols;
            component_data["drawer_front_plate"].count = 2*rows*cols;
            component_data["drawer_body"].count = 2*rows*cols;
            component_data["cover_drawer_top_bot"].count = 2*cols;
            component_data["cover_drawer_middle"].count =  cols*(4*rows -2);  //  3*cols + 3*cols + (rows -2)*4*cols
            break;

        case 1: //cupboards
            component_data["side _plate_with_no_lock_hook"].count = 2*rows;
            component_data["door_plate_no_lock"].count = rows*cols;
            component_data["mid_plate_no_lock"].count = rows * (cols - 1);
            component_data["door_hinge_top_bot"].count = (rows+1)*cols;
            // component_data["door_hinge_middle"].count = (rows - 1)*cols;
            component_data["cover_door_top_bot"].count = 2*cols;
            component_data["cover_door_middle"].count = 2*(rows - 1)*cols;
            // component_data["clip_plug"].count = 2*(((rows * cols)|0) + (cols|0));
            break;

        case 2: //custom
            component_data["side _plate_with_no_lock_hook"].count = 2*rows;
            component_data["door_plate_no_lock"].count = rows*cols;
            component_data["mid_plate_no_lock"].count = rows * (cols - 1);
            component_data["door_hinge_top_bot"].count = (rows+1)*cols;
            // component_data["door_hinge_middle"].count = (rows - 1)*cols;
            component_data["cover_door_top_bot"].count = 2*cols;
            component_data["cover_door_middle"].count = 2*(rows - 1)*cols;
            // component_data["clip_plug"].count = 2*(((rows * cols)|0) + (cols|0));
            break;
    }

    get_updated_price();
    inGameUIContainer.addChild(cell_grid);

    cell_grid.addChild(width_ui);
    width_ui.position.set(0.5 * cols * cellwidth, rows * cellwidth);
    cell_grid.addChild(height_ui);
    height_ui.position.set(cols * cellwidth, 0.5 * rows * cellwidth);

    console.log("cell grid at:" + cell_grid.x + ", " + cell_grid.y);
    update_Length_text();
}

function clear_grid() {
    var len = cell_grid.children.length;
    console.log("clearing " + len + " cells")
    // for (let index = 0; index < len; index++) {
    //     cell_grid.removeChild(cell_grid[index]);
    // }
    cell_grid.destroy(false);
    // cell_grid.height = 0;
    // inGameUIContainer.removeChild(cell_grid);
    cell_grid = new PIXI.Container();
    console.log("new width " + cell_grid.width);
    Object.keys(component_data).forEach(element => {
        component_data[element].count = 0;
    });
}

function oncellPicked(event) {
    // touch_event = event.data.getLocalPosition(this.parent);
    // this.tint = 0X000000;
    // this.init_x = this.x;
    // this.init_y = this.y;
    // cell_grid.addChild(this);
    // this.draggable = true;

    console.log("CLICKED!!!!");
    selected_cell = this;
    options_bubble_panel.visible = false;
    option_buttons_container.position.set(this.x, this.y);
    let topcell = selected_cell.ID - grid_cols < 0 ? selected_cell.ID : selected_cell.ID - grid_cols;
    if (cupboards_Array[selected_cell.ID].isempty) {
        delete_btn.visible = false;
    }
    else {
        delete_btn.visible = true;
    }

    get_adjacent_ids(parseInt(selected_cell.ID))
}

function set_input_min_max() {
    if (isInCm) {
        width_input_Main.value = ((grid_cols * dimX) * 100 | 0) / 100;
        height_input_Main.value = ((grid_rows * dimY) * 100 | 0) / 100;

        width_input_Config.value = ((grid_cols * dimX) * 100 | 0) / 100;
        height_input_Config.value = ((grid_rows * dimY) * 100 | 0) / 100;

        width_input_Main.min = dimX;
        width_input_Main.max = dimX * 30;
        width_input_Config.min = dimX;
        width_input_Config.max = dimX * 30;

        height_input_Main.min = dimY;
        height_input_Main.max = dimY * 30;
        height_input_Config.min = dimY;
        height_input_Config.max = dimY * 30;
    }

    else {
        width_input_Main.value = ((grid_cols * dimX * 0.393701) * 100 | 0) / 100;
        height_input_Main.value = ((grid_rows * dimY * 0.393701) * 100 | 0) / 100;

        width_input_Config.value = ((grid_cols * dimX * 0.393701) * 100 | 0) / 100;
        height_input_Config.value = ((grid_rows * dimY * 0.393701) * 100 | 0) / 100;

        width_input_Main.min = dimX;
        width_input_Main.max = dimX * 30;
        width_input_Config.min = dimX;
        width_input_Config.max = dimX * 30;

        height_input_Main.min = dimY;
        height_input_Main.max = dimY * 30;
        height_input_Config.min = dimY;
        height_input_Config.max = dimY * 30;
    }
}

function swap_empty_cell(cell_ID) {
    let current = cell_ID;
    let top = cell_ID - grid_cols;


    console.log("checking around cell " + cell_ID)

    let temp = cupboards_Array[current];
    cupboards_Array[current] = cupboards_Array[top];
    cupboards_Array[top] = temp;

    cupboards_Array[top].grid_cell.y -= cellheight;
    cupboards_Array[top].grid_cell.ID = top;
    cupboards_Array[current].grid_cell.y += cellheight;
    cupboards_Array[current].grid_cell.ID = current;

    if (top - grid_cols >= 0 && !cupboards_Array[top - grid_cols].isempty)
        swap_empty_cell(top);
    else
        check_horiaontal_neighbour_Cells(top);
        return;
}

function check_vertical_neighbour_Cells(cell_id) { 
    let empty_count = 0;  
    let x = 0;
    for (let index = 0; index < grid_rows; index++) {
        x = (cell_id - (index*grid_cols));
        x = x < 0 ? (grid_cols*grid_rows) + x : x ;
        if(cupboards_Array[x].isempty)
        {
            empty_count += 1;
        }
    }
    console.log("<><>>< "+empty_count+" , "+grid_rows)
    if(empty_count == grid_rows)
    {
        console.log("col is empty. remove 1 top plate, 1 top cover, 1 bottom cover");
    }
    else
    {
        console.log("col is not empty remove 2 mid covers")
    }
}

function check_horiaontal_neighbour_Cells(cell_id) {
    console.log("checking row with cell " + cell_id);
    let right_limit = 0;
    let left_limit = cell_id;
    let empty_cell_count = 1;
    console.log("grid cols" + grid_cols)

    if (left_limit % grid_cols === 0) {
        console.log("this is left end")
    }
    else {
        while (left_limit % grid_cols != 0) {
            left_limit -= 1;
            console.log("left " + left_limit);
        }
    }

    console.log("final left limit = " + left_limit)
    right_limit = (left_limit | 0 + grid_cols | 0);

    console.log("left limit = " + left_limit + "\nright limit = " + right_limit)

    for (let index = left_limit; index < right_limit; index++) {
        if (cupboards_Array[index].isempty) {
            empty_cell_count++;
        }
    }
    console.log("empty count = " + empty_cell_count);
}

function remove_cell_contents() {
    if (selected_cell.iscupboard === 1) 
    {
        console.log("remove back and bottom");
        component_data["bottom_plate"].count -= 1;
        component_data["back_plate"].count -= 1;
        console.log("remove door withOUT lock");
        component_data["door_plate_no_lock"].count -= 1;
        console.log("remove mid plate withOUT lock");
        component_data["mid_plate_no_lock"].count -= 1;
        console.log("remove 2 mid covers");
        component_data["cover_door_middle"].count -= 2;

        //consider topmost cell
        if(top_adj_cells.LEFT < 0 && top_adj_cells.RIGHT < 0)
        {
            console.log("remove 2 side plates");
        }

        else if(top_adj_cells.LEFT > 0 && top_adj_cells.RIGHT > 0)
        {
            //left is drawer && right is drawer
            if(cupboards_Array[top_adj_cells.LEFT].grid_cell.isdrawer === 1 && cupboards_Array[top_adj_cells.RIGH].grid_cell.isdrawer === 1)
            {
                console.log("remove 2 side panels");
            }

            // left is cupboard or shelf && right is cupboard or shelf
            else if((cupboards_Array[top_adj_cells.LEFT].grid_cell.iscupboard === 1 || cupboards_Array[top_adj_cells.LEFT].grid_cell.isshelf === 1) && 
                    (cupboards_Array[top_adj_cells.RIGHT].grid_cell.iscupboard === 1 || cupboards_Array[top_adj_cells.RIGHT].grid_cell.isshelf === 1))
            {
                console.log("remove 2 mid plates and add 2 side plates");
            }
        }
        else if((top_adj_cells.LEFT > 0 && (cupboards_Array[top_adj_cells.LEFT].grid_cell.iscupboard === 1 || cupboards_Array[top_adj_cells.LEFT].grid_cell.isshelf === 1)) &&
                (top_adj_cells.RIGHT < 0 || (top_adj_cells.RIGHT > 0 && cupboards_Array[top_adj_cells.RIGHT].grid_cell.isdrawer === 1)))
        {
            console.log("remove 1 mid plate");
        }
        else if((top_adj_cells.RIGHT>0 && (cupboards_Array[top_adj_cells.RIGHT].grid_cell.iscupboard === 1 || cupboards_Array[top_adj_cells.RIGHT].grid_cell.isshelf === 1)) &&
                (top_adj_cells.LEFT < 0 || (top_adj_cells.LEFT > 0 && cupboards_Array[top_adj_cells.LEFT].grid_cell.isdrawer === 1)))
        {
            console.log("remove 1 mid plate");
        }

        //consider selected cell
        if(adj_cells.BOTTOM > 0 && cupboards_Array[adj_cells.BOTTOM].grid_cell.isdrawer === 1)
        {
            console.log("remove 1 mid hinge")
        }
        if(adj_cells.TOP > 0 && cupboards_Array[adj_cells.TOP].grid_cell.isdrawer === 1)
        {
            console.log("remove 1 mid hinge")
        }

        if((adj_cells.TOP > 0 && cupboards_Array[adj_cells.TOP].grid_cell.iscupboard === 1) && 
            (adj_cells.BOTTOM > 0 && cupboards_Array[adj_cells.BOTTOM].grid_cell.iscupboard === 1))
        {
            if(selected_cell.flipped === 1)
            {
                console.log("remove 2 top/bot hinge")
            }
            else
            {
                console.log("remove 1 top/bot hinge")
            }
        }
        if(adj_cells.TOP < 0 && adj_cells.BOTTOM < 0)
        {
            console.log("end of the column, remove 1 top plate")
        }


        if(selected_cell.flipped)
        {
            //remove extra hinges of flipped door
            if(cell_isOn_Top_or_Bottom_of_grid(selected_cell))
            {
                console.log("remove one middle hinge")
                component_data["door_hinge_middle"].count -= 1;
            }
            else
            {
                console.log("remove 2 middle hinges")
                component_data["door_hinge_middle"].count -= 2;
            }
        }
    }

    else if(selected_cell.isdrawer === 1)
    {
        console.log("remove drawer to set cupboard");
        console.log("remove back and bottom");
        component_data["back_plate"].count -= 1;
        component_data["bottom_plate"].count -= 1;
        console.log("remove 2 drawers")
        component_data["drawer_front_plate"].count -= 2;
        component_data["drawer_body"].count -= 2;

        component_data["side_plate_drawer"].count -= 2;

        //consider topmost cell
        if (top_adj_cells.LEFT < 0 && top_adj_cells.RIGHT < 0) {
            console.log("remove 2 side plates");
        }
    }

    else if(selected_cell.isshelf === 1)
    {
        component_data["back_plate"].count -= 1;
        component_data["bottom_plate"].count -=  1;
        component_data["mid_plate_no_lock"].count -= 1;
    }
    
    selected_cell.iscupboard = 0;
    selected_cell.isdrawer = 0;
    selected_cell.haslock = 0;
    selected_cell.isshelf = 0;
}

function get_top_nonempty_cell(cell_Id) {
    
    let top = cell_Id - grid_cols
    if(top < 0)
    {
        console.log("topnnn "+cell_Id)
        topmost_nonempty_cell = cell_Id;
        return;
    }
    else if(cupboards_Array[top].isempty)
    {
        console.log("topnnn "+cell_Id)
        topmost_nonempty_cell = cell_Id;
        return;
    }
    else
    {
        get_top_nonempty_cell(top);
    }
}

function add_cell_content(unit_type) 
{
    if(unit_type === 0)//cupboard
    {
        //add default cupboard
        console.log("add default cupboard components")
        component_data["bottom_plate"].count += 1;
        component_data["back_plate"].count += 1;
        component_data["door_plate_no_lock"].count += 1;
    }
    else if(unit_type === 1)//drawer
    {
        //add drawer
        console.log("add default drawer components")
        component_data["back_plate"].count += 1;
        component_data["bottom_plate"].count +=  1;
        component_data["drawer_front_plate"].count += 2;
        component_data["side_plate_drawer"].count += 2;
        component_data["drawer_body"].count += 2;
    }

    else if(unit_type === 2) //shelf
    {
        //add shelf
        console.log("add default shelf components");
        component_data["back_plate"].count += 1;
        component_data["bottom_plate"].count +=  1;
    }

}

function cell_isOn_Top_or_Bottom_of_grid(cell) {
    let id  = cell.ID;
    let total = grid_cols*grid_rows;
    let lowerrowlimit = total - grid_cols - 1;
    if((id + grid_cols) >= (grid_cols*grid_rows) || (id - grid_cols)<0 )
    {
        console.log(">>> new method : cell is on top or bottom")
    }
    else if(cupboards_Array[id - grid_cols].isempty)
    {
        console.log(">>> new method : cell is topmost in column")
    }
    if((id < grid_cols) || (lowerrowlimit < id && id < total) )
    {
        return true;
    }
    else
    {
        return false;
    }
}

function cell_isOn_An_Edge_of_Grid(cell) {
    return ((cell.ID + 1) % grid_cols === 0 || cell.ID % grid_cols === 0)  ;
}

function pick_lockers() {
    console.log("LOCKERS");
    cell_type = cupboadTypes.LOCKER;
    dimX = 39.218;
    dimY = 44.335;

    set_input_min_max();

    $('#configModal').modal('show');
    get_parent_id();
    
    top_bar_lbl.textContent = get_type();
}

function pick_drawers() {
    console.log("DRAWERS");
    cell_type = cupboadTypes.DRAWER;
    dimX = 38.901;
    dimY = 40.958;

    set_input_min_max();

    $('#configModal').modal('show');
    get_parent_id();
    
    top_bar_lbl.textContent = get_type();
}

function pick_custom() {
    console.log("CUSTOM");
    cell_type = cupboadTypes.CUSTOM;
    dimX = 30;
    dimY = 30;

    set_input_min_max();

    $('#configModal').modal('show');
    get_parent_id();
    
    top_bar_lbl.textContent = get_type();
}

function submitData() {
    $('#configModal').modal('hide');

    $('#main').hide();
    $("#game").removeClass("d-none");
    $("#panel").removeClass("d-none");

    grid_cols = col_input_Main.value;
    grid_rows = row_input_Main.value;

    col_input_Config.value = grid_cols;
    row_input_Config.value = grid_rows;

    console.log(col_input_Main.value);

    if (!isGameLoaded) initCanvas();
    else create_grid(grid_cols, grid_rows);

    StartGameLoop(true);

}

function backToMain() {

    $("#game").addClass("d-none");
    $("#panel").addClass("d-none");


    StartGameLoop(false);
    $('#main').show();

}

function pick_type_show_modal_window() { //**************show modal window here****************** */

    cell_type = this.type;//0,1,2
    onSubmitBtnClick(10, 5); //TODO : REMOVE
    //show modal window here
}

function onSubmitBtnClick(cols, rows) { //*********call when submit button is pressed******************
    grid_cols = cols;
    grid_rows = rows;

    isMenu = false;
    isRemoveUI = true;
}

function get_updated_price() { //********************update text fields in web UI with price*************** */
    console.log(component_data);
    total_price = 0;
    let out = "";
    Object.keys(component_data).forEach(element => {
        total_price += (component_data[element].price * component_data[element].count);
        // if(component_data[element].count > 0)
        // {
        out += element + ", "+component_data[element].count+"\n";
        // }
    });

    document.querySelector('#price_txt').textContent = "Rs " + total_price;
    sidepanel_cupboards_text.textContent = ( component_data["door_plate_no_lock"].count ) + " * cupboard units";
    // sidepanel_locks_text.textContent =  "0 * locks";
    sidepanel_drawers_text.textContent = component_data["drawer_front_plate"].count + " * drawers";
    console.log(out)
}

function on_backbutton_clicked() { //************************ */call when back button clicked
    //stage.removeChild(inGameUIContainer);
    //open_main_menu(); 
    $("#game").addClass("d-none");
    $("#panel").addClass("d-none");
    StartGameLoop(false);
    $('#main').show();
}

function get_type() { //***************get cupboard type************* */
    switch (cell_type) {
        case cupboadTypes.DRAWER:
            top_bar_img.src="images/img_2.png";
            return "DRAWER UNITS"
            break;
        case cupboadTypes.LOCKER:
                top_bar_img.src="images/img_1.png"; 
            return "LOCKER SETS"
            break;
        case cupboadTypes.CUSTOM:
            top_bar_img.src="images/img_3.png";
            return "CUSTOM UNITS"
            break;
        default:
            break;
    }
}

function open_main_menu() { //***********open main menu when needed****/
    gameTicks = 0;
    isInitMenu = true;
    isMenu = false;
    isRemoveUI = false;
    isInitPlay = false;
    isPlaying = false;
    topUIContainer.visible = true;
}

function update_Length_text() {
    if (isInCm) {
        width_ui.text = (((grid_cols * dimX * 100)) | 0) / 100 + " cm";
        height_ui.text = (((grid_rows * dimY * 100)) | 0) / 100 + " cm";
    }
    else {
        width_ui.text = (((grid_cols * dimX * 0.393701 * 100)) | 0) / 100 + " in";
        height_ui.text = (((grid_rows * dimY * 0.393701 * 100)) | 0) / 100 + " in";
    }

    vertical_arrow1.x = (cell_grid.x + (cellwidth * grid_cols) + 40) / cell_grid.scale.x;
    vertical_arrow1.y = cell_grid.y / cell_grid.scale.y;

    vertical_arrow2.x = vertical_arrow1.x;
    vertical_arrow2.y = cell_grid.y + (cellheight * grid_rows);

    vertical_dottedline.x = vertical_arrow2.x;
    vertical_dottedline.y = vertical_arrow2.y;
    vertical_dottedline.width = cellheight * grid_rows;

    horizontal_arrow1.x = cell_grid.x;
    horizontal_arrow1.y = cell_grid.y + (cellheight * grid_rows) + 40;

    horizontal_arrow2.x = vertical_arrow1.x - 40;
    horizontal_arrow2.y = cell_grid.y + (cellheight * grid_rows) + 40;

    horizontal_dottedline.x = horizontal_arrow1.x;
    horizontal_dottedline.y = horizontal_arrow1.y;
    horizontal_dottedline.width = cellwidth * grid_cols;
}

const set_color = function (e) {
    console.log(e.target.id)
    let new_color = e.target.id;
    if(new_color != specification_color_id)
    {
        component_data["D"+new_color].count = component_data["D"+specification_color_id].count;
        component_data["C"+new_color].count = component_data["C"+specification_color_id].count;
        component_data["D"+specification_color_id].count = 0;
        component_data["C"+specification_color_id].count = 0;
        specification_color_id = new_color;
    
        get_updated_price();
    }

}

function add_to_cart() {
    Object.keys(component_data).forEach(element => {
        if(component_data[element].count > 0)
        {
            console.log("submiting >> parent id: "+parent_type_id+"\n"
            +component_data[element].count + " units of "+element
            + ",  id "+  component_data[element].id +"\n");
            // submitToCart(parent_type_id , component_data[element].id , component_data[element].count);
        }
    });
}

function on_drawer_option_clicked()
{
    //if empty, add
    if(cupboards_Array[selected_cell.ID].isempty)
    {
        selected_cell.iscupboard = 0;
        selected_cell.isdrawer = 1;
        selected_cell.haslock = 0;
        selected_cell.isshelf = 0;

        add_cell_content(1);
        selected_cell.alpha = 1;
        console.log("alpha "+selected_cell.alpha)
        delete_btn.visible = true
        cupboards_Array[selected_cell.ID].isempty = false;
    }
    //else 
        //if new one is this => dont add
        //new one is not this => remove this then add new one
    else
    {
        if(selected_cell.isdrawer === 1)
        {
            
        }
        else
        {
            remove_cell_contents();
            selected_cell.iscupboard = 0;
            selected_cell.isdrawer = 1;
            selected_cell.haslock = 0;
            selected_cell.isshelf = 0;
            add_cell_content(1);
        }
    }

    selected_cell.texture.frame.x = 8;
    selected_cell.texture._updateUvs();
    if (cuppboard_options_panel.visible) {
        cuppboard_options_panel.visible = false;
    }

    get_updated_price();
}

function on_cupboard_option_clicked()
{
    if(cupboards_Array[selected_cell.ID].isempty)
    {
        selected_cell.iscupboard = 1;
        selected_cell.isdrawer = 0;
        // selected_cell.haslock = 1;
        selected_cell.isshelf = 0;

        add_cell_content(0);
        selected_cell.alpha = 1;
        delete_btn.visible = true;
        cupboards_Array[selected_cell.ID].isempty = false;

    }
    else
    {
        if(selected_cell.iscupboard === 1)
        {
            
        }
        else
        {
            remove_cell_contents();
            selected_cell.iscupboard = 1;
            selected_cell.isdrawer = 0;
            // selected_cell.haslock = 1;
            add_cell_content(0);
        }
    }

    selected_cell.texture.frame.x = 120;
    selected_cell.texture._updateUvs();

    Lock_tick.texture.frame.x = 150;
    Lock_tick.texture._updateUvs();
    Flip_handle_tick.texture.frame.x = 120;
    Flip_handle_tick.texture._updateUvs();
    Lock_tick.ticked = 1;
    Flip_handle_tick.ticked = 1;

    if (!cuppboard_options_panel.visible) {
        cuppboard_options_panel.visible = true;
    }

    get_updated_price();

}

function on_flipHandle_tick_checked()
{
    Flip_handle_tick.ticked *= -1;
    if (Flip_handle_tick.ticked === -1) { //flip
        Flip_handle_tick.texture.frame.x = 150;
        selected_cell.texture.frame.x += 112 * 2;
        selected_cell.flipped = 1;
    } else if (Flip_handle_tick.ticked === 1) { //unflip
        Flip_handle_tick.texture.frame.x = 120;
        selected_cell.texture.frame.x -= 112 * 2;
        selected_cell.flipped = 0;   
    }

    check_top_and_bottom_cells();

    Flip_handle_tick.texture._updateUvs();
    selected_cell.texture._updateUvs();

    get_updated_price();

    function check_top_and_bottom_cells() {
        let top = adj_cells.TOP;
        let bot = adj_cells.BOTTOM;
        if(top >= 0)
        {
            if(cupboards_Array[top].grid_cell.iscupboard === 1)
            {
                //add or remove 1 mid hinge
                if(selected_cell.flipped === 1)
                {
                    console.log("add 1 mid hinge")
                    component_data["door_hinge_middle"].count += 1
                }
                else
                {
                    console.log("remove 1 mid hinge")
                    component_data["door_hinge_middle"].count -= 1
                }
            }
        }

        if(bot >= 0)
        {
            if(cupboards_Array[bot].grid_cell.iscupboard === 1)
            {
                //add or remove 1 mid hinge
                if(selected_cell.flipped === 1)
                {
                    console.log("add 1 mid hinge")
                    component_data["door_hinge_middle"].count += 1
                }
                else
                {
                    console.log("remove 1 mid hinge")
                    component_data["door_hinge_middle"].count -= 1
                }
            }
        }
    }
}

function on_delete_btn_clicked()
{
    console.log(selected_cell);
    get_top_nonempty_cell(selected_cell.ID);
    console.log("nnnnnn "+topmost_nonempty_cell);
    get_top_adjacent_ids(topmost_nonempty_cell);

    remove_cell_contents();

    selected_cell.alpha = 0;
    option_buttons_container.x = -1024;
    get_updated_price();
    cupboards_Array[selected_cell.ID].isempty = true;
    if (selected_cell.ID - grid_cols > 0) {
        swap_empty_cell(selected_cell.ID);
    }
    selected_cell = null;
}

function on_shelf_option_clicked()
{
    //if is empty add new one
    if(cupboards_Array[selected_cell.ID].isempty)
    {
        selected_cell.iscupboard = 0;
        selected_cell.isdrawer = 0;
        selected_cell.haslock = 0;
        selected_cell.isshelf = 1;

        add_cell_content(2);
        selected_cell.alpha = 1;
        console.log("alpha "+selected_cell.alpha)
        delete_btn.visible = true
        cupboards_Array[selected_cell.ID].isempty = false;
    }
    // else
        // if this is new one , return
        //else, remove and add new one
    else
    {
        if(selected_cell.isshelf === 1)
        {

        }
        else
        {
            remove_cell_contents();
            selected_cell.iscupboard = 0;
            selected_cell.isdrawer = 0;
            selected_cell.haslock = 0;
            selected_cell.isshelf = 1;
            add_cell_content(2);
        }
    }

    selected_cell.texture.frame.x = 568;
    selected_cell.texture._updateUvs();
    if (cuppboard_options_panel.visible) {
        cuppboard_options_panel.visible = false;
    }

    // console.log("new price " + total_price);
    get_updated_price();
}

function get_adjacent_ids(cell_id) {
    if((cell_id + 1) % grid_cols === 0){
        console.log("right side is empty ")
        adj_cells.RIGHT = -1;
    }
    else
    {
        adj_cells.RIGHT = cell_id + 1;
        if(cupboards_Array[adj_cells.RIGHT].isempty)
        {
            adj_cells.RIGHT = -1;
        }
    }

    if(cell_id % grid_cols === 0)
    {
        console.log("left side is empty")
        adj_cells.LEFT = -1;
    }
    else
    {
        adj_cells.LEFT = cell_id - 1;
        if(cupboards_Array[adj_cells.LEFT].isempty)
        {
            adj_cells.LEFT = -1;
        }
    }

    if((cell_id + parseInt(grid_cols)) >= (grid_cols*grid_rows))
    {
        console.log("bottom cell is empty ")
        adj_cells.BOTTOM = -1;
    }
    else
    {
        adj_cells.BOTTOM = (cell_id + parseInt(grid_cols));
        if(cupboards_Array[adj_cells.BOTTOM].isempty)
        {
            adj_cells.BOTTOM = -1;
        }
    }

    if((cell_id - grid_cols)<0)
    {
        console.log("top cell is empty")
        adj_cells.TOP = -1;
    }
    else
    {
        adj_cells.TOP = cell_id - grid_cols;
        if(cupboards_Array[adj_cells.TOP].isempty)
        {
            adj_cells.TOP = -1;
        }
    }

    console.log(adj_cells)
}

function get_top_adjacent_ids(cell_id) {
    if((cell_id + 1) % grid_cols === 0){
        console.log("right side is empty ")
        top_adj_cells.RIGHT = -1;
    }
    else
    {
        top_adj_cells.RIGHT = cell_id + 1;
        if(cupboards_Array[top_adj_cells.RIGHT].isempty)
        {
            top_adj_cells.RIGHT = -1;
        }
    }

    if(cell_id % grid_cols === 0)
    {
        console.log("left side is empty")
        top_adj_cells.LEFT = -1;
    }
    else
    {
        top_adj_cells.LEFT = cell_id - 1;
        if(cupboards_Array[top_adj_cells.LEFT].isempty)
        {
            top_adj_cells.LEFT = -1;
        }
    }

    if((cell_id + parseInt(grid_cols)) >= (grid_cols*grid_rows))
    {
        console.log("bottom cell is empty ")
        top_adj_cells.BOTTOM = -1;
    }
    else
    {
        top_adj_cells.BOTTOM = (cell_id + parseInt(grid_cols));
        if(cupboards_Array[top_adj_cells.BOTTOM].isempty)
        {
            top_adj_cells.BOTTOM = -1;
        }
    }

    if((cell_id - grid_cols)<0)
    {
        console.log("top cell is empty")
        top_adj_cells.TOP = -1;
    }
    else
    {
        top_adj_cells.TOP = cell_id - grid_cols;
        if(cupboards_Array[top_adj_cells.TOP].isempty)
        {
            top_adj_cells.TOP = -1;
        }
    }

    console.log(top_adj_cells)
}
var data = [

{
    "id": 203,
    "name": "Custom Product - Red, Small",
    "slug": "custom-product-2",
    "date_created": {
        "date": "2019-08-16 05:05:00.000000",
        "timezone_type": 1,
        "timezone": "+00:00"
    },
    "date_modified": {
        "date": "2019-08-16 05:07:38.000000",
        "timezone_type": 1,
        "timezone": "+00:00"
    },
    "status": "publish",
    "featured": false,
    "catalog_visibility": "visible",
    "description": "",
    "short_description": "",
    "sku": "",
    "price": "800",
    "regular_price": "1000",
    "sale_price": "800",
    "date_on_sale_from": null,
    "date_on_sale_to": null,
    "total_sales": "0",
    "tax_status": "taxable",
    "tax_class": "parent",
    "manage_stock": false,
    "stock_quantity": null,
    "stock_status": "instock",
    "backorders": "no",
    "low_stock_amount": "",
    "sold_individually": false,
    "weight": "",
    "length": "",
    "width": "",
    "height": "",
    "upsell_ids": [],
    "cross_sell_ids": [],
    "parent_id": 201,
    "reviews_allowed": false,
    "purchase_note": "",
    "attributes": {
        "_type": "bottom_plate",
        "pa_color": "red",
        "pa_size": "small"
    },
    "default_attributes": [],
    "menu_order": 1,
    "post_password": "",
    "virtual": false,
    "downloadable": false,
    "category_ids": [],
    "tag_ids": [],
    "shipping_class_id": 0,
    "downloads": [],
    "image_id": "",
    "gallery_image_ids": [],
    "download_limit": -1,
    "download_expiry": -1,
    "rating_counts": [],
    "average_rating": 0,
    "review_count": 0,
    "attribute_summary": "Color: Red, Size: Small",
    "meta_data": []
 },

 {
    "id": 202,
    "name": "Custom Product - Blue, Large",
    "slug": "custom-product",
    "date_created": {
        "date": "2019-08-16 05:04:44.000000",
        "timezone_type": 1,
        "timezone": "+00:00"
    },
    "date_modified": {
        "date": "2019-08-16 05:07:38.000000",
        "timezone_type": 1,
        "timezone": "+00:00"
    },
    "status": "publish",
    "featured": false,
    "catalog_visibility": "visible",
    "description": "",
    "short_description": "",
    "sku": "",
    "price": "1200",
    "regular_price": "1500",
    "sale_price": "1200",
    "date_on_sale_from": null,
    "date_on_sale_to": null,
    "total_sales": "0",
    "tax_status": "taxable",
    "tax_class": "parent",
    "manage_stock": false,
    "stock_quantity": null,
    "stock_status": "instock",
    "backorders": "no",
    "low_stock_amount": "",
    "sold_individually": false,
    "weight": "",
    "length": "",
    "width": "",
    "height": "",
    "upsell_ids": [],
    "cross_sell_ids": [],
    "parent_id": 201,
    "reviews_allowed": false,
    "purchase_note": "",
    "attributes": {
        "_type":"back_plate",
        "pa_color": "blue",
        "pa_size": "large"
    },
    "default_attributes": [],
    "menu_order": 3,
    "post_password": "",
    "virtual": false,
    "downloadable": false,
    "category_ids": [],
    "tag_ids": [],
    "shipping_class_id": 0,
    "downloads": [],
    "image_id": "",
    "gallery_image_ids": [],
    "download_limit": -1,
    "download_expiry": -1,
    "rating_counts": [],
    "average_rating": 0,
    "review_count": 0,
    "attribute_summary": "Color: Blue, Size: Large",
    "meta_data": []
 },

 {
    "id": 202,
    "name": "Custom Product - Blue, Large",
    "slug": "custom-product",
    "date_created": {
        "date": "2019-08-16 05:04:44.000000",
        "timezone_type": 1,
        "timezone": "+00:00"
    },
    "date_modified": {
        "date": "2019-08-16 05:07:38.000000",
        "timezone_type": 1,
        "timezone": "+00:00"
    },
    "status": "publish",
    "featured": false,
    "catalog_visibility": "visible",
    "description": "",
    "short_description": "",
    "sku": "",
    "price": "1200",
    "regular_price": "1500",
    "sale_price": "1200",
    "date_on_sale_from": null,
    "date_on_sale_to": null,
    "total_sales": "0",
    "tax_status": "taxable",
    "tax_class": "parent",
    "manage_stock": false,
    "stock_quantity": null,
    "stock_status": "instock",
    "backorders": "no",
    "low_stock_amount": "",
    "sold_individually": false,
    "weight": "",
    "length": "",
    "width": "",
    "height": "",
    "upsell_ids": [],
    "cross_sell_ids": [],
    "parent_id": 201,
    "reviews_allowed": false,
    "purchase_note": "",
    "attributes": {
        "_type":"door_plate_lock_bot",
        "pa_color": "blue",
        "pa_size": "large"
    },
    "default_attributes": [],
    "menu_order": 3,
    "post_password": "",
    "virtual": false,
    "downloadable": false,
    "category_ids": [],
    "tag_ids": [],
    "shipping_class_id": 0,
    "downloads": [],
    "image_id": "",
    "gallery_image_ids": [],
    "download_limit": -1,
    "download_expiry": -1,
    "rating_counts": [],
    "average_rating": 0,
    "review_count": 0,
    "attribute_summary": "Color: Blue, Size: Large",
    "meta_data": []
 },

 {
    "id": 202,
    "name": "Custom Product - Blue, Large",
    "slug": "custom-product",
    "date_created": {
        "date": "2019-08-16 05:04:44.000000",
        "timezone_type": 1,
        "timezone": "+00:00"
    },
    "date_modified": {
        "date": "2019-08-16 05:07:38.000000",
        "timezone_type": 1,
        "timezone": "+00:00"
    },
    "status": "publish",
    "featured": false,
    "catalog_visibility": "visible",
    "description": "",
    "short_description": "",
    "sku": "",
    "price": "1200",
    "regular_price": "1500",
    "sale_price": "1200",
    "date_on_sale_from": null,
    "date_on_sale_to": null,
    "total_sales": "0",
    "tax_status": "taxable",
    "tax_class": "parent",
    "manage_stock": false,
    "stock_quantity": null,
    "stock_status": "instock",
    "backorders": "no",
    "low_stock_amount": "",
    "sold_individually": false,
    "weight": "",
    "length": "",
    "width": "",
    "height": "",
    "upsell_ids": [],
    "cross_sell_ids": [],
    "parent_id": 201,
    "reviews_allowed": false,
    "purchase_note": "",
    "attributes": {
        "_type": "door_hinge_top_bot",
        "pa_color": "blue",
        "pa_size": "large"
    },
    "default_attributes": [],
    "menu_order": 3,
    "post_password": "",
    "virtual": false,
    "downloadable": false,
    "category_ids": [],
    "tag_ids": [],
    "shipping_class_id": 0,
    "downloads": [],
    "image_id": "",
    "gallery_image_ids": [],
    "download_limit": -1,
    "download_expiry": -1,
    "rating_counts": [],
    "average_rating": 0,
    "review_count": 0,
    "attribute_summary": "Color: Blue, Size: Large",
    "meta_data": []
 },

 {
    "id": 202,
    "name": "Custom Product - Blue, Large",
    "slug": "custom-product",
    "date_created": {
        "date": "2019-08-16 05:04:44.000000",
        "timezone_type": 1,
        "timezone": "+00:00"
    },
    "date_modified": {
        "date": "2019-08-16 05:07:38.000000",
        "timezone_type": 1,
        "timezone": "+00:00"
    },
    "status": "publish",
    "featured": false,
    "catalog_visibility": "visible",
    "description": "",
    "short_description": "",
    "sku": "",
    "price": "1200",
    "regular_price": "1500",
    "sale_price": "1200",
    "date_on_sale_from": null,
    "date_on_sale_to": null,
    "total_sales": "0",
    "tax_status": "taxable",
    "tax_class": "parent",
    "manage_stock": false,
    "stock_quantity": null,
    "stock_status": "instock",
    "backorders": "no",
    "low_stock_amount": "",
    "sold_individually": false,
    "weight": "",
    "length": "",
    "width": "",
    "height": "",
    "upsell_ids": [],
    "cross_sell_ids": [],
    "parent_id": 201,
    "reviews_allowed": false,
    "purchase_note": "",
    "attributes": {
        "_type":"lock",
        "pa_color": "blue",
        "pa_size": "large"
    },
    "default_attributes": [],
    "menu_order": 3,
    "post_password": "",
    "virtual": false,
    "downloadable": false,
    "category_ids": [],
    "tag_ids": [],
    "shipping_class_id": 0,
    "downloads": [],
    "image_id": "",
    "gallery_image_ids": [],
    "download_limit": -1,
    "download_expiry": -1,
    "rating_counts": [],
    "average_rating": 0,
    "review_count": 0,
    "attribute_summary": "Color: Blue, Size: Large",
    "meta_data": []
 },

 {
    "id": 202,
    "name": "Custom Product - Blue, Large",
    "slug": "custom-product",
    "date_created": {
        "date": "2019-08-16 05:04:44.000000",
        "timezone_type": 1,
        "timezone": "+00:00"
    },
    "date_modified": {
        "date": "2019-08-16 05:07:38.000000",
        "timezone_type": 1,
        "timezone": "+00:00"
    },
    "status": "publish",
    "featured": false,
    "catalog_visibility": "visible",
    "description": "",
    "short_description": "",
    "sku": "",
    "price": "1200",
    "regular_price": "1500",
    "sale_price": "1200",
    "date_on_sale_from": null,
    "date_on_sale_to": null,
    "total_sales": "0",
    "tax_status": "taxable",
    "tax_class": "parent",
    "manage_stock": false,
    "stock_quantity": null,
    "stock_status": "instock",
    "backorders": "no",
    "low_stock_amount": "",
    "sold_individually": false,
    "weight": "",
    "length": "",
    "width": "",
    "height": "",
    "upsell_ids": [],
    "cross_sell_ids": [],
    "parent_id": 201,
    "reviews_allowed": false,
    "purchase_note": "",
    "attributes": {
        "_type": "side _plate_with_no_lock_hook",
        "pa_color": "blue",
        "pa_size": "large"
    },
    "default_attributes": [],
    "menu_order": 3,
    "post_password": "",
    "virtual": false,
    "downloadable": false,
    "category_ids": [],
    "tag_ids": [],
    "shipping_class_id": 0,
    "downloads": [],
    "image_id": "",
    "gallery_image_ids": [],
    "download_limit": -1,
    "download_expiry": -1,
    "rating_counts": [],
    "average_rating": 0,
    "review_count": 0,
    "attribute_summary": "Color: Blue, Size: Large",
    "meta_data": []
 },

 {
    "id": 202,
    "name": "Custom Product - Blue, Large",
    "slug": "custom-product",
    "date_created": {
        "date": "2019-08-16 05:04:44.000000",
        "timezone_type": 1,
        "timezone": "+00:00"
    },
    "date_modified": {
        "date": "2019-08-16 05:07:38.000000",
        "timezone_type": 1,
        "timezone": "+00:00"
    },
    "status": "publish",
    "featured": false,
    "catalog_visibility": "visible",
    "description": "",
    "short_description": "",
    "sku": "",
    "price": "1200",
    "regular_price": "1500",
    "sale_price": "1200",
    "date_on_sale_from": null,
    "date_on_sale_to": null,
    "total_sales": "0",
    "tax_status": "taxable",
    "tax_class": "parent",
    "manage_stock": false,
    "stock_quantity": null,
    "stock_status": "instock",
    "backorders": "no",
    "low_stock_amount": "",
    "sold_individually": false,
    "weight": "",
    "length": "",
    "width": "",
    "height": "",
    "upsell_ids": [],
    "cross_sell_ids": [],
    "parent_id": 201,
    "reviews_allowed": false,
    "purchase_note": "",
    "attributes": {
        "_type": "side_plate_with_lock_hook",
        "pa_color": "blue",
        "pa_size": "large"
    },
    "default_attributes": [],
    "menu_order": 3,
    "post_password": "",
    "virtual": false,
    "downloadable": false,
    "category_ids": [],
    "tag_ids": [],
    "shipping_class_id": 0,
    "downloads": [],
    "image_id": "",
    "gallery_image_ids": [],
    "download_limit": -1,
    "download_expiry": -1,
    "rating_counts": [],
    "average_rating": 0,
    "review_count": 0,
    "attribute_summary": "Color: Blue, Size: Large",
    "meta_data": []
 },

 {
    "id": 202,
    "name": "Custom Product - Blue, Large",
    "slug": "custom-product",
    "date_created": {
        "date": "2019-08-16 05:04:44.000000",
        "timezone_type": 1,
        "timezone": "+00:00"
    },
    "date_modified": {
        "date": "2019-08-16 05:07:38.000000",
        "timezone_type": 1,
        "timezone": "+00:00"
    },
    "status": "publish",
    "featured": false,
    "catalog_visibility": "visible",
    "description": "",
    "short_description": "",
    "sku": "",
    "price": "1200",
    "regular_price": "1500",
    "sale_price": "1200",
    "date_on_sale_from": null,
    "date_on_sale_to": null,
    "total_sales": "0",
    "tax_status": "taxable",
    "tax_class": "parent",
    "manage_stock": false,
    "stock_quantity": null,
    "stock_status": "instock",
    "backorders": "no",
    "low_stock_amount": "",
    "sold_individually": false,
    "weight": "",
    "length": "",
    "width": "",
    "height": "",
    "upsell_ids": [],
    "cross_sell_ids": [],
    "parent_id": 201,
    "reviews_allowed": false,
    "purchase_note": "",
    "attributes": {
        "_type": "top_plate",
        "pa_color": "blue",
        "pa_size": "large"
    },
    "default_attributes": [],
    "menu_order": 3,
    "post_password": "",
    "virtual": false,
    "downloadable": false,
    "category_ids": [],
    "tag_ids": [],
    "shipping_class_id": 0,
    "downloads": [],
    "image_id": "",
    "gallery_image_ids": [],
    "download_limit": -1,
    "download_expiry": -1,
    "rating_counts": [],
    "average_rating": 0,
    "review_count": 0,
    "attribute_summary": "Color: Blue, Size: Large",
    "meta_data": []
 },

 {
    "id": 202,
    "name": "Custom Product - Blue, Large",
    "slug": "custom-product",
    "date_created": {
        "date": "2019-08-16 05:04:44.000000",
        "timezone_type": 1,
        "timezone": "+00:00"
    },
    "date_modified": {
        "date": "2019-08-16 05:07:38.000000",
        "timezone_type": 1,
        "timezone": "+00:00"
    },
    "status": "publish",
    "featured": false,
    "catalog_visibility": "visible",
    "description": "",
    "short_description": "",
    "sku": "",
    "price": "1200",
    "regular_price": "1500",
    "sale_price": "1200",
    "date_on_sale_from": null,
    "date_on_sale_to": null,
    "total_sales": "0",
    "tax_status": "taxable",
    "tax_class": "parent",
    "manage_stock": false,
    "stock_quantity": null,
    "stock_status": "instock",
    "backorders": "no",
    "low_stock_amount": "",
    "sold_individually": false,
    "weight": "",
    "length": "",
    "width": "",
    "height": "",
    "upsell_ids": [],
    "cross_sell_ids": [],
    "parent_id": 201,
    "reviews_allowed": false,
    "purchase_note": "",
    "attributes": {
        "_type": "mid_plate_lock",
        "pa_color": "blue",
        "pa_size": "large"
    },
    "default_attributes": [],
    "menu_order": 3,
    "post_password": "",
    "virtual": false,
    "downloadable": false,
    "category_ids": [],
    "tag_ids": [],
    "shipping_class_id": 0,
    "downloads": [],
    "image_id": "",
    "gallery_image_ids": [],
    "download_limit": -1,
    "download_expiry": -1,
    "rating_counts": [],
    "average_rating": 0,
    "review_count": 0,
    "attribute_summary": "Color: Blue, Size: Large",
    "meta_data": []
 },

 {
    "id": 202,
    "name": "Custom Product - Blue, Large",
    "slug": "custom-product",
    "date_created": {
        "date": "2019-08-16 05:04:44.000000",
        "timezone_type": 1,
        "timezone": "+00:00"
    },
    "date_modified": {
        "date": "2019-08-16 05:07:38.000000",
        "timezone_type": 1,
        "timezone": "+00:00"
    },
    "status": "publish",
    "featured": false,
    "catalog_visibility": "visible",
    "description": "",
    "short_description": "",
    "sku": "",
    "price": "1200",
    "regular_price": "1500",
    "sale_price": "1200",
    "date_on_sale_from": null,
    "date_on_sale_to": null,
    "total_sales": "0",
    "tax_status": "taxable",
    "tax_class": "parent",
    "manage_stock": false,
    "stock_quantity": null,
    "stock_status": "instock",
    "backorders": "no",
    "low_stock_amount": "",
    "sold_individually": false,
    "weight": "",
    "length": "",
    "width": "",
    "height": "",
    "upsell_ids": [],
    "cross_sell_ids": [],
    "parent_id": 201,
    "reviews_allowed": false,
    "purchase_note": "",
    "attributes": {
        "_type": "middle_foot",
        "pa_color": "blue",
        "pa_size": "large"
    },
    "default_attributes": [],
    "menu_order": 3,
    "post_password": "",
    "virtual": false,
    "downloadable": false,
    "category_ids": [],
    "tag_ids": [],
    "shipping_class_id": 0,
    "downloads": [],
    "image_id": "",
    "gallery_image_ids": [],
    "download_limit": -1,
    "download_expiry": -1,
    "rating_counts": [],
    "average_rating": 0,
    "review_count": 0,
    "attribute_summary": "Color: Blue, Size: Large",
    "meta_data": []
 },

 {
    "id": 202,
    "name": "Custom Product - Blue, Large",
    "slug": "custom-product",
    "date_created": {
        "date": "2019-08-16 05:04:44.000000",
        "timezone_type": 1,
        "timezone": "+00:00"
    },
    "date_modified": {
        "date": "2019-08-16 05:07:38.000000",
        "timezone_type": 1,
        "timezone": "+00:00"
    },
    "status": "publish",
    "featured": false,
    "catalog_visibility": "visible",
    "description": "",
    "short_description": "",
    "sku": "",
    "price": "1200",
    "regular_price": "1500",
    "sale_price": "1200",
    "date_on_sale_from": null,
    "date_on_sale_to": null,
    "total_sales": "0",
    "tax_status": "taxable",
    "tax_class": "parent",
    "manage_stock": false,
    "stock_quantity": null,
    "stock_status": "instock",
    "backorders": "no",
    "low_stock_amount": "",
    "sold_individually": false,
    "weight": "",
    "length": "",
    "width": "",
    "height": "",
    "upsell_ids": [],
    "cross_sell_ids": [],
    "parent_id": 201,
    "reviews_allowed": false,
    "purchase_note": "",
    "attributes": {
        "_type": "clip_plug",
        "pa_color": "blue",
        "pa_size": "large"
    },
    "default_attributes": [],
    "menu_order": 3,
    "post_password": "",
    "virtual": false,
    "downloadable": false,
    "category_ids": [],
    "tag_ids": [],
    "shipping_class_id": 0,
    "downloads": [],
    "image_id": "",
    "gallery_image_ids": [],
    "download_limit": -1,
    "download_expiry": -1,
    "rating_counts": [],
    "average_rating": 0,
    "review_count": 0,
    "attribute_summary": "Color: Blue, Size: Large",
    "meta_data": []
 },

 {
    "id": 202,
    "name": "Custom Product - Blue, Large",
    "slug": "custom-product",
    "date_created": {
        "date": "2019-08-16 05:04:44.000000",
        "timezone_type": 1,
        "timezone": "+00:00"
    },
    "date_modified": {
        "date": "2019-08-16 05:07:38.000000",
        "timezone_type": 1,
        "timezone": "+00:00"
    },
    "status": "publish",
    "featured": false,
    "catalog_visibility": "visible",
    "description": "",
    "short_description": "",
    "sku": "",
    "price": "1200",
    "regular_price": "1500",
    "sale_price": "1200",
    "date_on_sale_from": null,
    "date_on_sale_to": null,
    "total_sales": "0",
    "tax_status": "taxable",
    "tax_class": "parent",
    "manage_stock": false,
    "stock_quantity": null,
    "stock_status": "instock",
    "backorders": "no",
    "low_stock_amount": "",
    "sold_individually": false,
    "weight": "",
    "length": "",
    "width": "",
    "height": "",
    "upsell_ids": [],
    "cross_sell_ids": [],
    "parent_id": 201,
    "reviews_allowed": false,
    "purchase_note": "",
    "attributes": {
        "_type": "door_hinge_middle",
        "pa_color": "blue",
        "pa_size": "large"
    },
    "default_attributes": [],
    "menu_order": 3,
    "post_password": "",
    "virtual": false,
    "downloadable": false,
    "category_ids": [],
    "tag_ids": [],
    "shipping_class_id": 0,
    "downloads": [],
    "image_id": "",
    "gallery_image_ids": [],
    "download_limit": -1,
    "download_expiry": -1,
    "rating_counts": [],
    "average_rating": 0,
    "review_count": 0,
    "attribute_summary": "Color: Blue, Size: Large",
    "meta_data": []
 },

 {
    "id": 202,
    "name": "Custom Product - Blue, Large",
    "slug": "custom-product",
    "date_created": {
        "date": "2019-08-16 05:04:44.000000",
        "timezone_type": 1,
        "timezone": "+00:00"
    },
    "date_modified": {
        "date": "2019-08-16 05:07:38.000000",
        "timezone_type": 1,
        "timezone": "+00:00"
    },
    "status": "publish",
    "featured": false,
    "catalog_visibility": "visible",
    "description": "",
    "short_description": "",
    "sku": "",
    "price": "1200",
    "regular_price": "1500",
    "sale_price": "1200",
    "date_on_sale_from": null,
    "date_on_sale_to": null,
    "total_sales": "0",
    "tax_status": "taxable",
    "tax_class": "parent",
    "manage_stock": false,
    "stock_quantity": null,
    "stock_status": "instock",
    "backorders": "no",
    "low_stock_amount": "",
    "sold_individually": false,
    "weight": "",
    "length": "",
    "width": "",
    "height": "",
    "upsell_ids": [],
    "cross_sell_ids": [],
    "parent_id": 201,
    "reviews_allowed": false,
    "purchase_note": "",
    "attributes": {
        "_type": "cover_door_top_bot",
        "pa_color": "blue",
        "pa_size": "large"
    },
    "default_attributes": [],
    "menu_order": 3,
    "post_password": "",
    "virtual": false,
    "downloadable": false,
    "category_ids": [],
    "tag_ids": [],
    "shipping_class_id": 0,
    "downloads": [],
    "image_id": "",
    "gallery_image_ids": [],
    "download_limit": -1,
    "download_expiry": -1,
    "rating_counts": [],
    "average_rating": 0,
    "review_count": 0,
    "attribute_summary": "Color: Blue, Size: Large",
    "meta_data": []
 },

 {
    "id": 202,
    "name": "Custom Product - Blue, Large",
    "slug": "custom-product",
    "date_created": {
        "date": "2019-08-16 05:04:44.000000",
        "timezone_type": 1,
        "timezone": "+00:00"
    },
    "date_modified": {
        "date": "2019-08-16 05:07:38.000000",
        "timezone_type": 1,
        "timezone": "+00:00"
    },
    "status": "publish",
    "featured": false,
    "catalog_visibility": "visible",
    "description": "",
    "short_description": "",
    "sku": "",
    "price": "1200",
    "regular_price": "1500",
    "sale_price": "1200",
    "date_on_sale_from": null,
    "date_on_sale_to": null,
    "total_sales": "0",
    "tax_status": "taxable",
    "tax_class": "parent",
    "manage_stock": false,
    "stock_quantity": null,
    "stock_status": "instock",
    "backorders": "no",
    "low_stock_amount": "",
    "sold_individually": false,
    "weight": "",
    "length": "",
    "width": "",
    "height": "",
    "upsell_ids": [],
    "cross_sell_ids": [],
    "parent_id": 201,
    "reviews_allowed": false,
    "purchase_note": "",
    "attributes": {
        "_type": "cover_door_middle",
        "pa_color": "blue",
        "pa_size": "large"
    },
    "default_attributes": [],
    "menu_order": 3,
    "post_password": "",
    "virtual": false,
    "downloadable": false,
    "category_ids": [],
    "tag_ids": [],
    "shipping_class_id": 0,
    "downloads": [],
    "image_id": "",
    "gallery_image_ids": [],
    "download_limit": -1,
    "download_expiry": -1,
    "rating_counts": [],
    "average_rating": 0,
    "review_count": 0,
    "attribute_summary": "Color: Blue, Size: Large",
    "meta_data": []
 },

 {
    "id": 202,
    "name": "Custom Product - Blue, Large",
    "slug": "custom-product",
    "date_created": {
        "date": "2019-08-16 05:04:44.000000",
        "timezone_type": 1,
        "timezone": "+00:00"
    },
    "date_modified": {
        "date": "2019-08-16 05:07:38.000000",
        "timezone_type": 1,
        "timezone": "+00:00"
    },
    "status": "publish",
    "featured": false,
    "catalog_visibility": "visible",
    "description": "",
    "short_description": "",
    "sku": "",
    "price": "1200",
    "regular_price": "1500",
    "sale_price": "1200",
    "date_on_sale_from": null,
    "date_on_sale_to": null,
    "total_sales": "0",
    "tax_status": "taxable",
    "tax_class": "parent",
    "manage_stock": false,
    "stock_quantity": null,
    "stock_status": "instock",
    "backorders": "no",
    "low_stock_amount": "",
    "sold_individually": false,
    "weight": "",
    "length": "",
    "width": "",
    "height": "",
    "upsell_ids": [],
    "cross_sell_ids": [],
    "parent_id": 201,
    "reviews_allowed": false,
    "purchase_note": "",
    "attributes": {
        "_type": "cover_drawer_top_bot",
        "pa_color": "blue",
        "pa_size": "large"
    },
    "default_attributes": [],
    "menu_order": 3,
    "post_password": "",
    "virtual": false,
    "downloadable": false,
    "category_ids": [],
    "tag_ids": [],
    "shipping_class_id": 0,
    "downloads": [],
    "image_id": "",
    "gallery_image_ids": [],
    "download_limit": -1,
    "download_expiry": -1,
    "rating_counts": [],
    "average_rating": 0,
    "review_count": 0,
    "attribute_summary": "Color: Blue, Size: Large",
    "meta_data": []
 },

 {
    "id": 202,
    "name": "Custom Product - Blue, Large",
    "slug": "custom-product",
    "date_created": {
        "date": "2019-08-16 05:04:44.000000",
        "timezone_type": 1,
        "timezone": "+00:00"
    },
    "date_modified": {
        "date": "2019-08-16 05:07:38.000000",
        "timezone_type": 1,
        "timezone": "+00:00"
    },
    "status": "publish",
    "featured": false,
    "catalog_visibility": "visible",
    "description": "",
    "short_description": "",
    "sku": "",
    "price": "1200",
    "regular_price": "1500",
    "sale_price": "1200",
    "date_on_sale_from": null,
    "date_on_sale_to": null,
    "total_sales": "0",
    "tax_status": "taxable",
    "tax_class": "parent",
    "manage_stock": false,
    "stock_quantity": null,
    "stock_status": "instock",
    "backorders": "no",
    "low_stock_amount": "",
    "sold_individually": false,
    "weight": "",
    "length": "",
    "width": "",
    "height": "",
    "upsell_ids": [],
    "cross_sell_ids": [],
    "parent_id": 201,
    "reviews_allowed": false,
    "purchase_note": "",
    "attributes": {
        "_type": "cover_drawer_middle",
        "pa_color": "blue",
        "pa_size": "large"
    },
    "default_attributes": [],
    "menu_order": 3,
    "post_password": "",
    "virtual": false,
    "downloadable": false,
    "category_ids": [],
    "tag_ids": [],
    "shipping_class_id": 0,
    "downloads": [],
    "image_id": "",
    "gallery_image_ids": [],
    "download_limit": -1,
    "download_expiry": -1,
    "rating_counts": [],
    "average_rating": 0,
    "review_count": 0,
    "attribute_summary": "Color: Blue, Size: Large",
    "meta_data": []
 },

 {
    "id": 202,
    "name": "Custom Product - Blue, Large",
    "slug": "custom-product",
    "date_created": {
        "date": "2019-08-16 05:04:44.000000",
        "timezone_type": 1,
        "timezone": "+00:00"
    },
    "date_modified": {
        "date": "2019-08-16 05:07:38.000000",
        "timezone_type": 1,
        "timezone": "+00:00"
    },
    "status": "publish",
    "featured": false,
    "catalog_visibility": "visible",
    "description": "",
    "short_description": "",
    "sku": "",
    "price": "1200",
    "regular_price": "1500",
    "sale_price": "1200",
    "date_on_sale_from": null,
    "date_on_sale_to": null,
    "total_sales": "0",
    "tax_status": "taxable",
    "tax_class": "parent",
    "manage_stock": false,
    "stock_quantity": null,
    "stock_status": "instock",
    "backorders": "no",
    "low_stock_amount": "",
    "sold_individually": false,
    "weight": "",
    "length": "",
    "width": "",
    "height": "",
    "upsell_ids": [],
    "cross_sell_ids": [],
    "parent_id": 201,
    "reviews_allowed": false,
    "purchase_note": "",
    "attributes": {
        "_type": "door_plate_no_lock",
        "pa_color": "blue",
        "pa_size": "large"
    },
    "default_attributes": [],
    "menu_order": 3,
    "post_password": "",
    "virtual": false,
    "downloadable": false,
    "category_ids": [],
    "tag_ids": [],
    "shipping_class_id": 0,
    "downloads": [],
    "image_id": "",
    "gallery_image_ids": [],
    "download_limit": -1,
    "download_expiry": -1,
    "rating_counts": [],
    "average_rating": 0,
    "review_count": 0,
    "attribute_summary": "Color: Blue, Size: Large",
    "meta_data": []
 },

 {
    "id": 202,
    "name": "Custom Product - Blue, Large",
    "slug": "custom-product",
    "date_created": {
        "date": "2019-08-16 05:04:44.000000",
        "timezone_type": 1,
        "timezone": "+00:00"
    },
    "date_modified": {
        "date": "2019-08-16 05:07:38.000000",
        "timezone_type": 1,
        "timezone": "+00:00"
    },
    "status": "publish",
    "featured": false,
    "catalog_visibility": "visible",
    "description": "",
    "short_description": "",
    "sku": "",
    "price": "1200",
    "regular_price": "1500",
    "sale_price": "1200",
    "date_on_sale_from": null,
    "date_on_sale_to": null,
    "total_sales": "0",
    "tax_status": "taxable",
    "tax_class": "parent",
    "manage_stock": false,
    "stock_quantity": null,
    "stock_status": "instock",
    "backorders": "no",
    "low_stock_amount": "",
    "sold_individually": false,
    "weight": "",
    "length": "",
    "width": "",
    "height": "",
    "upsell_ids": [],
    "cross_sell_ids": [],
    "parent_id": 201,
    "reviews_allowed": false,
    "purchase_note": "",
    "attributes": {
        "_type": "drawer_body",
        "pa_color": "blue",
        "pa_size": "large"
    },
    "default_attributes": [],
    "menu_order": 3,
    "post_password": "",
    "virtual": false,
    "downloadable": false,
    "category_ids": [],
    "tag_ids": [],
    "shipping_class_id": 0,
    "downloads": [],
    "image_id": "",
    "gallery_image_ids": [],
    "download_limit": -1,
    "download_expiry": -1,
    "rating_counts": [],
    "average_rating": 0,
    "review_count": 0,
    "attribute_summary": "Color: Blue, Size: Large",
    "meta_data": []
 },

 {
    "id": 202,
    "name": "Custom Product - Blue, Large",
    "slug": "custom-product",
    "date_created": {
        "date": "2019-08-16 05:04:44.000000",
        "timezone_type": 1,
        "timezone": "+00:00"
    },
    "date_modified": {
        "date": "2019-08-16 05:07:38.000000",
        "timezone_type": 1,
        "timezone": "+00:00"
    },
    "status": "publish",
    "featured": false,
    "catalog_visibility": "visible",
    "description": "",
    "short_description": "",
    "sku": "",
    "price": "1200",
    "regular_price": "1500",
    "sale_price": "1200",
    "date_on_sale_from": null,
    "date_on_sale_to": null,
    "total_sales": "0",
    "tax_status": "taxable",
    "tax_class": "parent",
    "manage_stock": false,
    "stock_quantity": null,
    "stock_status": "instock",
    "backorders": "no",
    "low_stock_amount": "",
    "sold_individually": false,
    "weight": "",
    "length": "",
    "width": "",
    "height": "",
    "upsell_ids": [],
    "cross_sell_ids": [],
    "parent_id": 201,
    "reviews_allowed": false,
    "purchase_note": "",
    "attributes": {
        "_type": "drawer_front_plate",
        "pa_color": "blue",
        "pa_size": "large"
    },
    "default_attributes": [],
    "menu_order": 3,
    "post_password": "",
    "virtual": false,
    "downloadable": false,
    "category_ids": [],
    "tag_ids": [],
    "shipping_class_id": 0,
    "downloads": [],
    "image_id": "",
    "gallery_image_ids": [],
    "download_limit": -1,
    "download_expiry": -1,
    "rating_counts": [],
    "average_rating": 0,
    "review_count": 0,
    "attribute_summary": "Color: Blue, Size: Large",
    "meta_data": []
 },

 {
    "id": 202,
    "name": "Custom Product - Blue, Large",
    "slug": "custom-product",
    "date_created": {
        "date": "2019-08-16 05:04:44.000000",
        "timezone_type": 1,
        "timezone": "+00:00"
    },
    "date_modified": {
        "date": "2019-08-16 05:07:38.000000",
        "timezone_type": 1,
        "timezone": "+00:00"
    },
    "status": "publish",
    "featured": false,
    "catalog_visibility": "visible",
    "description": "",
    "short_description": "",
    "sku": "",
    "price": "1200",
    "regular_price": "1500",
    "sale_price": "1200",
    "date_on_sale_from": null,
    "date_on_sale_to": null,
    "total_sales": "0",
    "tax_status": "taxable",
    "tax_class": "parent",
    "manage_stock": false,
    "stock_quantity": null,
    "stock_status": "instock",
    "backorders": "no",
    "low_stock_amount": "",
    "sold_individually": false,
    "weight": "",
    "length": "",
    "width": "",
    "height": "",
    "upsell_ids": [],
    "cross_sell_ids": [],
    "parent_id": 201,
    "reviews_allowed": false,
    "purchase_note": "",
    "attributes": {
        "_type": "mid_plate_no_lock",
        "pa_color": "blue",
        "pa_size": "large"
    },
    "default_attributes": [],
    "menu_order": 3,
    "post_password": "",
    "virtual": false,
    "downloadable": false,
    "category_ids": [],
    "tag_ids": [],
    "shipping_class_id": 0,
    "downloads": [],
    "image_id": "",
    "gallery_image_ids": [],
    "download_limit": -1,
    "download_expiry": -1,
    "rating_counts": [],
    "average_rating": 0,
    "review_count": 0,
    "attribute_summary": "Color: Blue, Size: Large",
    "meta_data": []
 },

 {
    "id": 202,
    "name": "Custom Product - Blue, Large",
    "slug": "custom-product",
    "date_created": {
        "date": "2019-08-16 05:04:44.000000",
        "timezone_type": 1,
        "timezone": "+00:00"
    },
    "date_modified": {
        "date": "2019-08-16 05:07:38.000000",
        "timezone_type": 1,
        "timezone": "+00:00"
    },
    "status": "publish",
    "featured": false,
    "catalog_visibility": "visible",
    "description": "",
    "short_description": "",
    "sku": "",
    "price": "1200",
    "regular_price": "1500",
    "sale_price": "1200",
    "date_on_sale_from": null,
    "date_on_sale_to": null,
    "total_sales": "0",
    "tax_status": "taxable",
    "tax_class": "parent",
    "manage_stock": false,
    "stock_quantity": null,
    "stock_status": "instock",
    "backorders": "no",
    "low_stock_amount": "",
    "sold_individually": false,
    "weight": "",
    "length": "",
    "width": "",
    "height": "",
    "upsell_ids": [],
    "cross_sell_ids": [],
    "parent_id": 201,
    "reviews_allowed": false,
    "purchase_note": "",
    "attributes": {
        "_type": "side_foot",
        "pa_color": "blue",
        "pa_size": "large"
    },
    "default_attributes": [],
    "menu_order": 3,
    "post_password": "",
    "virtual": false,
    "downloadable": false,
    "category_ids": [],
    "tag_ids": [],
    "shipping_class_id": 0,
    "downloads": [],
    "image_id": "",
    "gallery_image_ids": [],
    "download_limit": -1,
    "download_expiry": -1,
    "rating_counts": [],
    "average_rating": 0,
    "review_count": 0,
    "attribute_summary": "Color: Blue, Size: Large",
    "meta_data": []
 },

 {
    "id": 202,
    "name": "Custom Product - Blue, Large",
    "slug": "custom-product",
    "date_created": {
        "date": "2019-08-16 05:04:44.000000",
        "timezone_type": 1,
        "timezone": "+00:00"
    },
    "date_modified": {
        "date": "2019-08-16 05:07:38.000000",
        "timezone_type": 1,
        "timezone": "+00:00"
    },
    "status": "publish",
    "featured": false,
    "catalog_visibility": "visible",
    "description": "",
    "short_description": "",
    "sku": "",
    "price": "1200",
    "regular_price": "1500",
    "sale_price": "1200",
    "date_on_sale_from": null,
    "date_on_sale_to": null,
    "total_sales": "0",
    "tax_status": "taxable",
    "tax_class": "parent",
    "manage_stock": false,
    "stock_quantity": null,
    "stock_status": "instock",
    "backorders": "no",
    "low_stock_amount": "",
    "sold_individually": false,
    "weight": "",
    "length": "",
    "width": "",
    "height": "",
    "upsell_ids": [],
    "cross_sell_ids": [],
    "parent_id": 201,
    "reviews_allowed": false,
    "purchase_note": "",
    "attributes": {
        "_type": "side_plate_drawer",
        "pa_color": "blue",
        "pa_size": "large"
    },
    "default_attributes": [],
    "menu_order": 3,
    "post_password": "",
    "virtual": false,
    "downloadable": false,
    "category_ids": [],
    "tag_ids": [],
    "shipping_class_id": 0,
    "downloads": [],
    "image_id": "",
    "gallery_image_ids": [],
    "download_limit": -1,
    "download_expiry": -1,
    "rating_counts": [],
    "average_rating": 0,
    "review_count": 0,
    "attribute_summary": "Color: Blue, Size: Large",
    "meta_data": []
 }

];

function get_parent_id() {
    url = new URL(window.location.href);
    parent_type_id = url.searchParams.get("type");
    console.log("ttttt<<<<< " + parent_type_id);

    // getVariations(parent_type_id, get_component_datalist)
    get_component_datalist(data);
    
    function get_component_datalist(full_list) {
        console.log(full_list)
        for (let index = 0; index < full_list.length; index++) {
            let obj = full_list[index].attributes;
            if(component_data[obj._type])
            {
                component_data[obj._type].id = full_list[index].id;
                component_data[obj._type].price = full_list[index].price;
            }
        }
        console.log(component_data)
    }
}

//TODO: remove only for DEBUG 
function keyboard(keyCode) {
    var key = {};
    key.code = keyCode;
    key.isDown = false;
    key.isUp = true;
    key.press = undefined;
    key.release = undefined;

    //The `downHandler`
    key.downHandler = function (event) {
        if (event.keyCode === key.code) {
            if (key.isUp && key.press) key.press();
            key.isDown = true;
            key.isUp = false;
        }
        event.preventDefault();
    };

    //The `upHandler`
    key.upHandler = function (event) {
        if (event.keyCode === key.code) {
            if (key.isDown && key.release) key.release();
            key.isDown = false;
            key.isUp = true;
        }
        event.preventDefault();
    };

    //Attach event listeners
    window.addEventListener(
        "keydown", key.downHandler.bind(key), false
    );
    window.addEventListener(
        "keyup", key.upHandler.bind(key), false
    );

    //Return the `key` object
    return key;
}