package ru.sfedu.app.webapi;

import java.util.HashMap;
import java.util.Map;

import javax.enterprise.context.RequestScoped;
import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.PUT;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;

import org.jboss.resteasy.annotations.cache.NoCache;

@NoCache
@RequestScoped
@Path("/home")
@Consumes(MediaType.APPLICATION_JSON)
@Produces(MediaType.APPLICATION_JSON)
public class HomeResource {

    public static Map<String, Integer> wrapResult(int value) {
        final Map<String, Integer> response = new HashMap<>();
        response.put("value", value);

        return response;
    }

    @GET
    @Path("/info")
    public Map<String, Integer> getInfo() {
        return wrapResult(10);
    }

    @PUT
    @Path("/info")
    public Map<String, Integer> putInfo() {
        return wrapResult(10);
    }
}
