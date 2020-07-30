class CategoriesController < ApplicationController
  def index
    categories = Category.all
    render json: categories.as_json(
      only: %i[id name],
      include: {
        settings: {
          only: %i[name id],
        },
      }
    )
  end
end
