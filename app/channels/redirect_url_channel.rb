class RedirectUrlChannel < ApplicationCable::Channel
  def self.for_token(token:)
    "RedirectUrlChannel_#{token}"
  end

  def subscribed
    stream_from RedirectUrlChannel.for_token(
                  token: token_param
                )
  end

  def receive(data)
    ActionCable.server.broadcast(
      RedirectUrlChannel.for_token(
        token: token_param
      ),
      data
    )
  end

  private

  def token_param
    params[:room]
  end
end

