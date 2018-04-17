package ru.sfedu.app;

import java.util.Collection;
import java.util.HashSet;
import java.util.Set;

import javax.enterprise.context.ApplicationScoped;
import javax.inject.Inject;
import javax.ws.rs.ApplicationPath;
import javax.ws.rs.core.Application;

import org.jboss.resteasy.cdi.ResteasyCdiExtension;

@ApplicationScoped
@ApplicationPath("/")
public class Controller extends Application {

	@Inject
	private ResteasyCdiExtension extension;

	@Override
	@SuppressWarnings("unchecked")
	public Set<Class<?>> getClasses() {
		final Set<Class<?>> result = new HashSet<>();   
                result.addAll((Collection<? extends Class<?>>) (Object)extension.getResources());
		result.addAll((Collection<? extends Class<?>>) (Object)extension.getProviders());
		return result;
	}
}
