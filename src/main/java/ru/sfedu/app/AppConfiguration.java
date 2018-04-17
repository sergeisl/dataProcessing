package ru.sfedu.app;

import java.nio.charset.StandardCharsets;

import javax.enterprise.context.ApplicationScoped;
import javax.enterprise.context.Dependent;
import javax.enterprise.inject.Produces;

import org.apache.commons.configuration2.Configuration;
import org.apache.commons.configuration2.FileBasedConfiguration;
import org.apache.commons.configuration2.PropertiesConfiguration;
import org.apache.commons.configuration2.builder.FileBasedConfigurationBuilder;
import org.apache.commons.configuration2.builder.fluent.Parameters;
import org.apache.commons.configuration2.ex.ConfigurationException;
import org.apache.commons.configuration2.io.ClasspathLocationStrategy;

@Dependent
public class AppConfiguration {

    public static final String WEBSERVER_HOST = "webServer.host";

    public static final String WEBSERVER_HOST_DEFAULT = "localhost";

    public static final String WEBSERVER_PORT = "webServer.port";

    public static final int WEBSERVER_PORT_DEFAULT = 8080;

    public static final String WEBSERVER_CACHECONTROL = "webServer.staticCacheControl";

    public static final String WEBSERVER_CACHECONTROL_DEFAULT = "max-age=3600, must-revalidate";

    public static final String WEBSERVER_ISOMORPHIC = "webServer.isomorphic";

    public static final boolean WEBSERVER_ISOMORPHIC_DEFAULT = true;

    public static final String WEBSERVER_MIN_IDLE_SCRIPT_ENGINES = "webServer.minIdleScriptEngines";

    public static final int WEBSERVER_MIN_IDLE_SCRIPT_ENGINES_DEFAULT = 3;

    public static final String CLASSPATH_CONFIG_FILENAME = "config.properties";

    @Produces
    @ApplicationScoped
    public Configuration getConfiguration() {
        final FileBasedConfigurationBuilder<FileBasedConfiguration> classPathConfigBuilder
                = new FileBasedConfigurationBuilder<FileBasedConfiguration>(PropertiesConfiguration.class)
                        .configure(
                                new Parameters()
                                        .fileBased()
                                        .setFileName(CLASSPATH_CONFIG_FILENAME)
                                        .setThrowExceptionOnMissing(false)
                                        .setEncoding(StandardCharsets.UTF_8.name())
                                        .setLocationStrategy(new ClasspathLocationStrategy()));
        try {
            return classPathConfigBuilder.getConfiguration();
        } catch (ConfigurationException e) {
            throw new RuntimeException(e);
        }
    }
}
