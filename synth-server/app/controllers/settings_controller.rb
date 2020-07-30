class SettingsController < ApplicationController
  def index
    settings = Setting.all
    render json: settings.as_json(
      only: [:id, :name, :gain, :stop_time, :a_frequency],
      include: {
        category: {
          only: [:id, :name]
        }
      }
    )
  end

  def show
    setting = Setting.find(params[:id])
    render json: setting.to_json(
        except: [:created_at, :updated_at]
      )
  end

  def create
    setting = Setting.create(setting_params)
    if setting
      render json: setting.to_json(
        except: [:created_at, :updated_at]
      )
    else
      render json: { errors: setting.errors }
    end
  end

  def update
    setting = Setting.find(params[:setting][:id])
    params.delete(:id)
    if setting.update(setting_params)
      render json: setting.to_json(
        except: [:created_at, :updated_at]
      )
    else
      render json: { msg: "unable to update #{setting.name}" }
    end
  end

  def destroy
    setting = Setting.find(params[:id])
    setting.destroy
    render json: { msg: "deleted" }
  end

private

  def setting_params
    params.require(:setting).permit(:id, :name, :gain, :stop_time, :a_frequency, :category_id)
  end
end
