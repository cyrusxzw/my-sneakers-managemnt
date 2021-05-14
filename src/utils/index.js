const util = {
    getTotalPages(res) {
        const totalPages = [];
        for (let i = 1; i <= res; i++) {
            totalPages.push(i);
        }
        return totalPages;
    },
    pagination(data, callback) {
        const page = {
            onChange: (current) => {
                callback(current);
            },
            current: data.page,
            pageSize: 10,
            total: data.total,
            showTotal: () => {
                return `共${data}条`
            },
            showQuickJumper: true
        }
        return page;
    }
}

export default util;