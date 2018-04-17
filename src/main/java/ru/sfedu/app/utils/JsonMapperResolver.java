package ru.sfedu.app.utils;

import javax.enterprise.context.ApplicationScoped;
import javax.inject.Inject;
import javax.ws.rs.ext.ContextResolver;
import javax.ws.rs.ext.Provider;

import com.fasterxml.jackson.databind.ObjectMapper;

@Provider
@ApplicationScoped
public class JsonMapperResolver implements ContextResolver<ObjectMapper> {

    @Inject
    private ObjectMapper jsonMapper;

    @Override
    public ObjectMapper getContext(Class<?> type) {
        return jsonMapper;
    }
}
