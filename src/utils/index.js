import Axios from '../axios';

const util = {
    getTotalPages(res) {
        const totalPages = [];
        for (let i = 1; i <= res; i++) {
            totalPages.push(i);
        }
        return totalPages;
    },
    pagination(currentPage, totalPage, totalRecords, callback) {
        const page = {
            onChange: (current) => {
                callback(current);
            },
            pageSizeOptions: [10],
            current: currentPage,
            pageSize: 10,
            total: totalPage,
            showTotal: () => {
                return `共${totalRecords}条`
            },
            showQuickJumper: true
        }
        return page;
    },
    auth() {
        return new Promise((resolve, reject) => {
            Axios.ajax({
                url: 'https://solegood.com.au/wp-json/jwt-auth/v1/token',
                method: 'post',
                isShowLoading: false,
                data: {
                    username: 'cyrusxzw',
                    password: 'P@55word!@#'
                },
                headers: {
                    'Content-Type': 'application/json',
                    'accept': 'application/json',
                }
            }).then(res => res.data)
                .then((data) => {
                    if (data.token) {
                        resolve(data.token);
                    } else {
                        reject(new Error("没有获取授权！"))
                    }
                })
        })
    }
}

export default util;