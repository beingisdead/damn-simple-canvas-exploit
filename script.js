const originalAjax = $.ajax;

const blockedStrings = ['events', 'backup', 'simple_response'];

$.ajax = function() {
    const args = Array.prototype.slice.call(arguments);
    const url = args[0].url || args[0];

    const isBlocked = blockedStrings.some(str => url.includes(str));

    if (isBlocked) {
        console.log('AJAX Request blocked:', url);
        return Promise.reject(new Error('Request blocked due to URL containing blocked strings.'));
    }

    return originalAjax.apply(this, arguments);
};

function clearQlaEvents() {
    localStorage.removeItem('qla_events');
    console.log('qla_events cleared from localStorage.');
}

$('#submit_quiz_button').click(function() {
    clearQlaEvents();
});
