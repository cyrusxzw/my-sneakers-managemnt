
const state1 = window.location.hash === '#/managment' ? "数据统计" : "数据分析";

const change = (state = state1, action) => {
    switch (action.type) {
        case 'CHANGETITLE':
            return action.payload;
        default:
            return state;
    }
}

export default change;