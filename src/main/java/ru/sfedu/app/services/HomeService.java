package ru.sfedu.app.services;

import java.io.DataInputStream;
import java.io.IOException;
import java.util.logging.Level;
import java.util.logging.Logger;
import javax.inject.Inject;
import ru.sfedu.core.Core;
import ru.sfedu.core.model.Info;
import ru.sfedu.core.util.Strategy;

/**
 *
 * @author sergei
 */
public class HomeService {
    
    @Inject
    private Core core;
    public Info getInfo(){
        DataInputStream data = core.getData(core.getExperiment(1L, Strategy.StrategySecond));
        try {
            data.readShort();
        } catch (IOException ex) {
            Logger.getLogger(HomeService.class.getName()).log(Level.SEVERE, null, ex);
        }
        return null;
    }
 
}
