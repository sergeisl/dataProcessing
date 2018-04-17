package ru.sfedu.app.webresources;

import javax.enterprise.context.RequestScoped;
import javax.ws.rs.ClientErrorException;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

import org.jboss.resteasy.annotations.cache.NoCache;

import ru.sfedu.app.views.ViewResult;

@NoCache
@Path("/")
@RequestScoped
@Produces(MediaType.TEXT_HTML + ";charset=utf-8")
public class RootResource {

    @GET
    @Path("/")
    public ViewResult getIndex() {
        return new ViewResult("index.html");
    }
    @GET
    @Path("/home")
    public ViewResult getHsome()
            throws Throwable {
        return new ViewResult("index.html")
                .addInitialState("info", 1);
    }

    @GET
    @Path("/error")
    public void error()
            throws Throwable {
        throw new ClientErrorException(Response.Status.BAD_REQUEST);
    }
}
