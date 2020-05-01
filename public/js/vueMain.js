let vueInstance = new Vue({
    el: '#show-result',
    data: {
        submitData: '',
        isSubmitClicked: false,
        urls: [
            'https://www.indian-visagov.com',
            'https://www.indian-visagov.com',
            'https://www.indianvisagov.asia',
            'https://www.indianvisagov.asia',
            'https://www.indiavisagov.in',
            'https://www.indiavisagov.in',
            'https://www.indian-visagov.com',
            'https://www.indian-visagov.com',
            'https://www.indianvisagov.asia',
            'https://www.indianvisagov.asia',
            'https://www.indiavisagov.in',
            'https://www.indiavisagov.in'
        ],
    },
    methods: {
        handleSubmitForm: function(e) {
            console.log(e);
        }
    },

});