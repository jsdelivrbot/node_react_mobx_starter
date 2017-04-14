// import { Router } from 'director';
import { autorun } from 'mobx';

export function startRouter(store) {
    // console.log('trying to start da router and shit');
    console.log('da viewstore: ', store);
    // update state on url change
    const router = new Router({
        "/intro": () => {
          console.log("intro");
          store.showIntro()
        },
        "/survey/:stringRoute": (stringRoute) => store.routeSection(stringRoute),
        //   console.log(stringRoute);
        //   console.log("yo!");
        //   store.routeSection(stringRoute);
        // }
    }).configure({
        notfound: () => {
          console.log('this is not found');
          store.showCurrent()
        },
        html5history: true
    }).init()

    // update url on state changes
    autorun(() => {
        const path = store.currentPath
        if (path !== window.location.pathname)
                window.history.pushState(null, null, path)
    })

}
