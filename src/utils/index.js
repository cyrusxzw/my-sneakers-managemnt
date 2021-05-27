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
    }
}

export default util;