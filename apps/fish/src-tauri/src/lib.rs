use std::sync::Mutex;
use tauri::{AppHandle, Manager, State};

struct SetupState {
    frontend_setup: bool,
}

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .plugin(tauri_plugin_os::init())
        .plugin(tauri_plugin_opener::init())
        .manage(Mutex::new(SetupState {
            frontend_setup: false,
        }))
        .invoke_handler(tauri::generate_handler![set_complete])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}

// https://v2.tauri.app/learn/splashscreen/
#[tauri::command]
async fn set_complete(
    app: AppHandle,
    state: State<'_, Mutex<SetupState>>,
    task: String,
) -> Result<(), ()> {
    // Lock the state without write access
    let mut state_lock = state.lock().unwrap();

    match task.as_str() {
        "frontend" => state_lock.frontend_setup = true,
        _ => panic!("invalid task completed!"),
    }

    if state_lock.frontend_setup {
        let splash_window = app.get_webview_window("splash").unwrap();
        let main_window = app.get_webview_window("main").unwrap();
        splash_window.close().unwrap();
        main_window.show().unwrap();
    }
    Ok(())
}
