package ru.sfedu.app.webresources;

import java.io.InputStream;
import java.net.URLConnection;
import java.util.Date;

import javax.enterprise.context.RequestScoped;
import javax.inject.Inject;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.core.CacheControl;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.Request;
import javax.ws.rs.core.Response;
import javax.ws.rs.core.Response.ResponseBuilder;
import javax.ws.rs.core.UriInfo;

import org.apache.commons.configuration2.Configuration;
import org.apache.commons.lang3.StringUtils;
import org.apache.commons.lang3.time.DateUtils;

import ru.sfedu.app.AppConfiguration;
import ru.sfedu.app.utils.ResourceUtilities;

@Path("/")
@RequestScoped
public class StaticFilesResource {

    private final static Date START_DATE = DateUtils.setMilliseconds(new Date(), 0);

    @Inject
    private Configuration configuration;

    @GET
    @Path("{fileName:.*}.{ext}")
    public Response getAsset(
            @PathParam("fileName") String fileName,
            @PathParam("ext") String ext,
            @Context UriInfo uriInfo,
            @Context Request request)
            throws Exception {
        if (StringUtils.contains(fileName, "nomin") || StringUtils.contains(fileName, "server")) {
            return Response.status(Response.Status.NOT_FOUND)
                    .build();
        }

        final ResponseBuilder builder
                = request.evaluatePreconditions(START_DATE);
        if (builder != null) {
            return builder.build();
        }

        final String fileFullName
                = "webapp/static/" + fileName + "." + ext;
        final InputStream resourceStream
                = ResourceUtilities.getResourceStream(fileFullName);
        if (resourceStream != null) {
            final String cacheControl = configuration.getString(
                    AppConfiguration.WEBSERVER_HOST, AppConfiguration.WEBSERVER_HOST_DEFAULT);
            return Response.ok(resourceStream)
                    .type(URLConnection.guessContentTypeFromName(fileFullName))
                    .cacheControl(CacheControl.valueOf(cacheControl))
                    .lastModified(START_DATE)
                    .build();
        }

        return Response.status(Response.Status.NOT_FOUND)
                .build();
    }
}
