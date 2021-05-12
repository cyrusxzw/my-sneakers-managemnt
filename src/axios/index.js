import axios from 'axios';
import '../style/loading.less';

export default class Axios {
    static ajax(options) {
        const loading = document.getElementById('ajaxLoading');
        if (options.isShowLoading) {
            loading.style.display = "block";
        }
        return new Promise((resolve, reject) => {
            axios({
                url: options.url,
                method: options.method,
                timeout: 5000,
                data: options.data
            }).then((res) => {
                loading.style.display = "none";
                if (res.status === 200) {
                    resolve(res);
                } else {
                    reject(new Error("连接错误，无法访问数据！"))
                }
            })
        })
    }
}