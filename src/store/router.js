import { Router } from 'director/build/director';
import { autorun } from 'mobx';

export function startRouter(store) {

    // update state on url change
    const router = new Router({
        // "/question/:questionId": (id) => store.showDocument(id),

        "/intro/": () => store.showIntro(),
        "/section/:sectionId/question/:questionId": (sectionId, questionId) => store.showSection(sectionId, questionId),


        //  pass ^this^ a string or something to generate a unique route for user results
        // on the client side rather than sending stuff back to the server. better for mobile use
        // less reliance on the server too

    }).configure({
        notfound: () => store.showIntro(),
        html5history: true
    }).init()

    // update url on state changes
    autorun(() => {
        const path = store.currentPath
        if (path !== window.location.pathname)
                window.history.pushState(null, null, path)
    })

}
