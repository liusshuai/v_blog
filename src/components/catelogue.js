export default {
    data() {
        return {
            scrollTop: 0,

        }
    },
    props: {
        datas: {
            default: () => [],
            type: Array
        }
    },
    mounted() {
        window.addEventListener('scroll' ,() => {
            this.scrollTop = document.documentElement.scrollTop;
            this.$forceUpdate();
        });
    },
    methods: {
        pageScroll(top) {
            document.documentElement.scrollTo(0, top);
        },
        normalizeArray(array, datas) {
            array.forEach(item => {
                datas.push({
                    top: item.top,
                    text: item.text
                });
                if (item.children) {
                    this.normalizeArray(item.children, datas);
                }
            });
        }
    },
    render(c) {
        const createCateList = (cates, index) => {

            const content = cates.map(item => {
                const _content = [c('span', {
                    class: {
                        cate_text: true
                    },
                    style: {
                        fontWeight: this.scrollTop >= item.top && this.scrollTop < item.nextTop
                            ? 'bold' : 'normal'
                    },
                    on: {
                        click: () => this.pageScroll(item.top)
                    }
                }, [item.text])];

                if (item.children && item.children.length) {
                    _content.push(createCateList(item.children, index + 1));
                }
                
                return c('li', _content);
            });

            return c('ul', {
                style: {
                    fontSize: '14px',
                    paddingLeft: `${0 + 10 * index}px`
                }
            }, content);
        }

        return createCateList(this.datas, 0);
    }
}