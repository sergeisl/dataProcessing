package ru.sfedu.app;

import java.util.concurrent.CountDownLatch;

import org.apache.commons.configuration2.Configuration;
import org.jboss.resteasy.cdi.CdiInjectorFactory;
import org.jboss.resteasy.plugins.server.netty.cdi.CdiNettyJaxrsServer;
import org.jboss.resteasy.spi.ResteasyDeployment;
import org.jboss.weld.environment.se.Weld;
import org.jboss.weld.environment.se.WeldContainer;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.slf4j.bridge.SLF4JBridgeHandler;

public class main {

    private final static Logger LOG = LoggerFactory.getLogger(main.class);

    public static void main(String[] args) {
        SLF4JBridgeHandler.removeHandlersForRootLogger();
        SLF4JBridgeHandler.install();

        LOG.info("Start application");

        final Weld weld = new Weld();
        weld.property(Weld.SHUTDOWN_HOOK_SYSTEM_PROPERTY, false);
        final WeldContainer container = weld.initialize();

        final Configuration configuration
                = container.select(Configuration.class).get();

        final CdiNettyJaxrsServer nettyServer = new CdiNettyJaxrsServer();

        final String host = configuration.getString(
                AppConfiguration.WEBSERVER_HOST, AppConfiguration.WEBSERVER_HOST_DEFAULT);
        nettyServer.setHostname(host);
        final int port = configuration.getInt(
                AppConfiguration.WEBSERVER_PORT, AppConfiguration.WEBSERVER_PORT_DEFAULT);
        nettyServer.setPort(port);

        final ResteasyDeployment deployment = nettyServer.getDeployment();
        deployment.setInjectorFactoryClass(CdiInjectorFactory.class.getName());
        deployment.setApplicationClass(Controller.class.getName());

        nettyServer.start();

        LOG.info("Server on http://{}:{}", host, port);

        try {
            final CountDownLatch shutdownSignal = new CountDownLatch(1);
            Runtime.getRuntime().addShutdownHook(new Thread(() -> {
                shutdownSignal.countDown();
            }));

            try {
                shutdownSignal.await();
            } catch (InterruptedException e) {
            }
        } finally {
            nettyServer.stop();
            container.shutdown();

            LOG.info("Application shutdown");

            SLF4JBridgeHandler.uninstall();
        }
    }
}
