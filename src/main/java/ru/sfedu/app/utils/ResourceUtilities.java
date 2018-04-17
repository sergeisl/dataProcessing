package ru.sfedu.app.utils;

import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.nio.charset.StandardCharsets;

import org.apache.commons.io.IOUtils;

public final class ResourceUtilities {

    public static InputStream getResourceStream(String fileName) {
        final ClassLoader contextClassLoader
                = Thread.currentThread().getContextClassLoader();
        if (contextClassLoader != null) {
            return contextClassLoader.getResourceAsStream(fileName);
        } else {
            return ClassLoader.getSystemResourceAsStream(fileName);
        }
    }

    public static String getResourceAsString(String fileName)
            throws IOException {
        try (InputStream stream = getResourceStream(fileName)) {
            final String result = new String(
                    IOUtils.toByteArray(stream), StandardCharsets.UTF_8);
            return result;
        }
    }

    public static InputStreamReader getResourceTextReader(String fileName)
            throws IOException {
        final InputStream stream = getResourceStream(fileName);
        return new InputStreamReader(stream, StandardCharsets.UTF_8);
    }
}
