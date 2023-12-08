const APP_ENV = process.env.REACT_APP_ENV;

let W_SOCKET_SERVER;
let W_HOST_URL;

if (APP_ENV === 'prod'){
  W_SOCKET_SERVER                   = process.env.REACT_APP_SOCKET_SERVER_PROD;
  W_HOST_URL                        = process.env.REACT_APP_API_URL_PROD;
} else if (APP_ENV === 'dev'){
  W_SOCKET_SERVER                   = process.env.REACT_APP_SOCKET_SERVER_DEV;
  W_HOST_URL                        = process.env.REACT_APP_API_URL_DEV;
}

export const APP_VERSION = process.env.REACT_APP_VERSION;
export const ASSET_IMAGES = process.env.REACT_APP_ASSETS_PATH + "/images";
export const ASSET_ICONS = process.env.REACT_APP_ASSETS_PATH + "/icons";
export const USE_IMAGE_PLACEHOLDERS = false;

export const HOST_URL = W_HOST_URL;
export const CHAT_SVR_URL = W_SOCKET_SERVER;
export const PUBLIC_URL = "";
// export const PUBLIC_URL = "";

export const staticFiles = {
  icons: {
    ic_book: `${ASSET_ICONS}/Icon_Book.svg`,
    ic_folder: `${ASSET_ICONS}/Icon_Folder.svg`,
    ic_heart: `${ASSET_ICONS}/Icon_Heart.svg`,
    ic_heart_gray: `${ASSET_ICONS}/Icon_Heart_Gray.svg`,
    ic_help: `${ASSET_ICONS}/Icon_Help.svg`,
    ic_home: `${ASSET_ICONS}/Icon_Home.svg`,
    ic_list: `${ASSET_ICONS}/Icon_List.svg`,
    ic_notification: `${ASSET_ICONS}/Icon_Notification.svg`,
    ic_notification_color: `${ASSET_ICONS}/Icon_Notification_Color.svg`,
    ic_noti_close: `${ASSET_ICONS}/Icon_Noti_Close.svg`,
    ic_paste: `${ASSET_ICONS}/Icon_Paste.svg`,
    ic_search: `${ASSET_ICONS}/Icon_Search.svg`,
    ic_user: `${ASSET_ICONS}/Icon_User.svg`,
    ic_user_plus: `${ASSET_ICONS}/Icon_User_Plus.svg`,
    ic_user_unfill: `${ASSET_ICONS}/Icon_User_Unfill.svg`,
    ic_instagram: `${ASSET_ICONS}/Instagram_Logo.svg`,
    ic_youtube: `${ASSET_ICONS}/Youtube_Logo.svg`,
    ic_twitter: `${ASSET_ICONS}/Twitter_Logo.svg`,
    ic_item: `${ASSET_ICONS}/Item_Logo.svg`,
    ic_logo: `${ASSET_ICONS}/Logo.svg`,
    ic_title1: `${ASSET_ICONS}/Title1.svg`,
    ic_title2: `${ASSET_ICONS}/Title2.svg`,
    ic_navbar1: `${ASSET_ICONS}/Navbar1.svg`,
    ic_navbar2: `${ASSET_ICONS}/Navbar2.svg`,
    ic_navbar3: `${ASSET_ICONS}/Navbar3.svg`,
    ic_navbar4: `${ASSET_ICONS}/Navbar4.svg`,
    ic_navbar5: `${ASSET_ICONS}/Navbar5.svg`,
    ic_dot: `${ASSET_ICONS}/Icon_Dot.svg`,
    ic_slider: `${ASSET_ICONS}/Icon_Slider.svg`,
    ic_step_help: `${ASSET_ICONS}/Icon_Step_Help.svg`,
    ic_back: `${ASSET_ICONS}/Icon_Back.svg`,
    ic_back_btn: `${ASSET_ICONS}/Icon_Back_Button.svg`,
    ic_white_dot: `${ASSET_ICONS}/White_Dot.svg`,
    ic_youtube1: `${ASSET_ICONS}/Icon_Youtube1.svg`,
    ic_youtube2: `${ASSET_ICONS}/Icon_Youtube2.svg`,
    ic_tiktok: `${ASSET_ICONS}/Icon_Tiktok.svg`,
    ic_back_white: `${ASSET_ICONS}/Icon_Back_White.svg`,
    ic_user_plus_brown: `${ASSET_ICONS}/Icon_User_Plus_Brown.svg`,
  },
  images: {
    logo: `${ASSET_IMAGES}/Logo.png`,
    avatar: `${ASSET_IMAGES}/Avatar.png`,
    blog: `${ASSET_IMAGES}/Blog.png`,
    ellipse_left: `${ASSET_IMAGES}/Ellipse_Left.png`,
    ellipse_right: `${ASSET_IMAGES}/Ellipse_Right.png`,
    ellipse_two: `${ASSET_IMAGES}/Ellipse_Two.png`,
    ellipse_three: `${ASSET_IMAGES}/Ellipse_Three.png`,
    ellipse_step: `${ASSET_IMAGES}/Ellipse_Step.png`,
    homeImage: `${ASSET_IMAGES}/Home_Image.png`,
    introduction1: `${ASSET_IMAGES}/Introduction1.png`,
    introduction2: `${ASSET_IMAGES}/Introduction2.png`,
    introduction3: `${ASSET_IMAGES}/Introduction3.png`,
    modalBackground: `${ASSET_IMAGES}/Modal_BG.png`,
    model: `${ASSET_IMAGES}/Model.png`,
    slide1: `${ASSET_IMAGES}/Slider1.png`,
    slide2: `${ASSET_IMAGES}/Slider2.png`,
    slide3: `${ASSET_IMAGES}/Slider3.png`,
    circle: `${ASSET_IMAGES}/Circle.png`,
    footer: `${ASSET_IMAGES}/Footer.png`,
    tab_active_default: `${ASSET_IMAGES}/Tab_Active_Default.png`,
    tab_active: `${ASSET_IMAGES}/Tab_Active.png`,
    tab_inactive: `${ASSET_IMAGES}/Tab_Inactive.png`,
    finish: `${ASSET_IMAGES}/Finish.png`,
    creator_logo : `${ASSET_IMAGES}/Creator_Logo.png`,
    youtube: `${ASSET_IMAGES}/Youtube.png`,
    seventeen: `${ASSET_IMAGES}/Seventeen.png`,
    twitter: `${ASSET_IMAGES}/Twitter.png`,
    instagram: `${ASSET_IMAGES}/Instagram.png`,
    tiktok: `${ASSET_IMAGES}/Tiktok.png`,
    youtube1: `${ASSET_IMAGES}/Youtube1.png`,
    blog1: `${ASSET_IMAGES}/Blog1.png`,
    blog2: `${ASSET_IMAGES}/Blog2.png`,
    profile: `${ASSET_IMAGES}/Profile.png`,
    card1: `${ASSET_IMAGES}/Card1.png`,
    card2: `${ASSET_IMAGES}/Card2.png`,
    card3: `${ASSET_IMAGES}/Card3.png`,
    download: `${ASSET_IMAGES}/Download.png`,
    bankLogo1: `${ASSET_IMAGES}/Bank_Logo1.png`,
    bankLogo2: `${ASSET_IMAGES}/Bank_Logo2.png`,
    file: `${ASSET_IMAGES}/File.png`,
    folder: `${ASSET_IMAGES}/Folder.png`,
    more: `${ASSET_IMAGES}/More.png`,
    userProfile: `${ASSET_IMAGES}/User_Profile.png`,
    userPlusBrown: `${ASSET_IMAGES}/User_Plus_Brown.png`,
    productFile: `${ASSET_IMAGES}/Product_File.png`,
    contract: `${ASSET_IMAGES}/Contract.png`,
    addCard: `${ASSET_IMAGES}/Add_Card.png`,
    cardLogo1: `${ASSET_IMAGES}/Card_Logo1.png`,
    cardLogo2: `${ASSET_IMAGES}/Card_Logo2.png`,
    cardLogo3: `${ASSET_IMAGES}/Card_Logo3.png`,
    cardLogo4: `${ASSET_IMAGES}/Card_Logo4.png`,
    cardLogo5: `${ASSET_IMAGES}/Card_Logo5.png`,
  },
};

export const btnBackground = "#EE7D90"
export const btnBackgroundHover = "#E28E9C"
export const fontBold = "bold";
export const fontSize30 = "30px";
export const fontSize28 = "28px";
export const fontSize26 = "26px";
export const fontSize24 = "24px";
export const fontSize22 = "22px";
export const fontSize20 = "20px";
export const fontSize18 = "18px";
export const fontSize16 = "16px";
export const fontSize14 = "14px";
export const fontSize12 = "12px";

export const scrollTop = () => {
  window.scrollTo(0, 0);
}
// export const API = "localhost:5000/";

// export const fetcher =
//   <T, U>(endpoint: string, map?: (data: T) => U) =>
//   async () => {
//     const res = await fetch(`${API}${endpoint}`);
//     const data = await res.json();

//     return map ? map(data) : data;
//   };