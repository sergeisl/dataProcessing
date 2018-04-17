package ru.sfedu.app.views;

import java.util.HashMap;
import java.util.Map;

public class ViewResult {
	
	private final String template;
	
	private final boolean useIsomorphic;
	
	private final Map<String, Object> viewData = new HashMap<>();
	
	private final Map<String, Object> reduxInitialState = new HashMap<>();

	public ViewResult(String template) {
		this.template = template;
		this.useIsomorphic = true;
	}
	
	public ViewResult(String template, boolean useIsomorphic) {
		this.template = template;
		this.useIsomorphic = useIsomorphic;
	}	
	
	public String getTemplate() {
		return template;
	}

        public Map<String, Object> getViewData() {
		return viewData;
	}

	public Map<String, Object> getReduxInitialState() {
		return reduxInitialState;
	}
	
	public boolean getUseIsomorphic() {
		return useIsomorphic;
	}
	
	public ViewResult add(String key, Object value) {
		viewData.put(key, value);
		return this;
	}

	public ViewResult addInitialState(String key, Object value) {
		reduxInitialState.put(key, value);
		return this;
	}
}
