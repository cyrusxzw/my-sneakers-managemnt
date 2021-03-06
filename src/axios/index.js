import axios from 'axios';
import { notification } from 'antd';
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
                data: options.data,
                headers: options.headers
            }).then((res) => {
                loading.style.display = "none";
                if (res.status === 200 || res.status === 201) {
                    resolve(res);
                } else {
                    reject(new Error("连接错误，无法访问数据！"))
                }
            }).catch(
                (res) => {
                    console.log(res.message);
                    notification.error({

                        message: `出错了！请刷新！`,
                        description: `出错原因： ${res.message}`
                    });
                }
            )
        })
    }
}