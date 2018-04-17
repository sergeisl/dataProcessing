package ru.sfedu.app.webresources;

import javax.enterprise.context.RequestScoped;
import javax.inject.Inject;
import javax.ws.rs.ClientErrorException;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

import org.jboss.resteasy.annotations.cache.NoCache;
import ru.sfedu.app.services.HomeService;

import ru.sfedu.app.views.ViewResult;
import ru.sfedu.app.webapi.HomeResource;
import ru.sfedu.core.model.Info;

@NoCache
@Path("/")
@RequestScoped
@Produces(MediaType.TEXT_HTML + ";charset=utf-8")
public class RootResource {
    
    @Inject
    private HomeService homeService;

    @GET
    @Path("/")
    public ViewResult getIndex() {
        return new ViewResult("index.html")
                .addInitialState("home", HomeResource.wrapResult(1));
    }
    @GET
    @Path("/home")
    public ViewResult getHome()
            throws Throwable {
        final Info info = homeService.getInfo();
        
        return new ViewResult("index.html")
                .addInitialState("home", info);
    }

    @GET
    @Path("/error")
    public void error()
            throws Throwable {
        throw new ClientErrorException(Response.Status.BAD_REQUEST);
    }
}
