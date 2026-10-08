import { useState } from "react";

export default function Booking() {
	const [submitted, setSubmitted] = useState(false);

	function handleSubmit(event) {
		event.preventDefault();
		setSubmitted(true);
	}

	return (
		<main className="booking-page">
			<section className="booking-card" aria-labelledby="booking-title">
				<header className="booking-header">
					<span className="booking-brand">HOMENEST</span>
					<h1 id="booking-title">Book your stay</h1>
					<p>Find your place to feel at home. Tell us about your trip to get started.</p>
				</header>

				{submitted ? (
					<div className="booking-confirmation" role="status">
						<span className="confirmation-icon" aria-hidden="true">✓</span>
						<h2>Request received!</h2>
						<p>Thanks for choosing HomeNest. We’ll be in touch shortly to confirm your stay.</p>
						<button type="button" className="secondary-button" onClick={() => setSubmitted(false)}>
							Make another request
						</button>
					</div>
				) : (
					<form className="booking-form" onSubmit={handleSubmit}>
						<div className="field full-width">
							<label htmlFor="destination">Property or destination</label>
							<input id="destination" name="destination" placeholder="Where would you like to stay?" required />
						</div>
						<div className="field">
							<label htmlFor="check-in">Check-in</label>
							<input id="check-in" name="checkIn" type="date" min={new Date().toISOString().slice(0, 10)} required />
						</div>
						<div className="field">
							<label htmlFor="check-out">Check-out</label>
							<input id="check-out" name="checkOut" type="date" min={new Date().toISOString().slice(0, 10)} required />
						</div>
						<div className="field full-width">
							<label htmlFor="guests">Guests</label>
							<select id="guests" name="guests" defaultValue="2">
								{[1, 2, 3, 4, 5, 6, 7, 8].map((count) => (
									<option key={count} value={count}>{count} {count === 1 ? "guest" : "guests"}</option>
								))}
							</select>
						</div>

						<div className="section-title full-width"><h2>Your details</h2></div>
						<div className="field full-width">
							<label htmlFor="full-name">Full name</label>
							<input id="full-name" name="name" autoComplete="name" placeholder="Your name" required />
						</div>
						<div className="field">
							<label htmlFor="email">Email address</label>
							<input id="email" name="email" type="email" autoComplete="email" placeholder="you@example.com" required />
						</div>
						<div className="field">
							<label htmlFor="phone">Phone number</label>
							<input id="phone" name="phone" type="tel" autoComplete="tel" placeholder="Your phone number" required />
						</div>
						<button className="submit-button full-width" type="submit">Request to book <span aria-hidden="true">→</span></button>
						<p className="form-note full-width">Your stay isn’t confirmed until we get in touch.</p>
					</form>
				)}
			</section>

			<style>{`
				.booking-page { min-height: 100vh; box-sizing: border-box; display: grid; place-items: center; padding: 44px 18px; background: #f5f7f4; color: #20372b; font-family: inherit; }
				.booking-card { width: min(100%, 680px); box-sizing: border-box; padding: clamp(24px, 5vw, 46px); border: 1px solid #e3e9e3; border-radius: 20px; background: #fff; box-shadow: 0 18px 50px #25483212; }
				.booking-header { margin-bottom: 30px; }
				.booking-brand { color: #438258; font-size: 12px; font-weight: 800; letter-spacing: .16em; }
				.booking-header h1 { margin: 12px 0 8px; font-size: clamp(29px, 5vw, 38px); letter-spacing: -.035em; }
				.booking-header p { margin: 0; color: #718078; line-height: 1.6; }
				.booking-form { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 18px 16px; }
				.full-width { grid-column: 1 / -1; }
				.field { display: flex; min-width: 0; flex-direction: column; gap: 8px; }
				.field label { color: #33483a; font-size: 13px; font-weight: 650; }
				.field input, .field select { width: 100%; min-height: 47px; box-sizing: border-box; padding: 11px 12px; border: 1px solid #dce4dd; border-radius: 9px; background: #fff; color: #263a2e; font: inherit; }
				.field input::placeholder { color: #a0aaa3; }
				.field input:focus, .field select:focus { outline: 3px solid #43825826; border-color: #438258; }
				.section-title { padding-top: 8px; border-top: 1px solid #edf0ed; }
				.section-title h2 { margin: 12px 0 0; font-size: 17px; }
				.submit-button { display: flex; min-height: 50px; align-items: center; justify-content: center; gap: 10px; border: 0; border-radius: 9px; background: #286642; color: white; cursor: pointer; font: inherit; font-weight: 700; transition: background .15s ease; }
				.submit-button:hover { background: #1f5133; }
				.submit-button:focus-visible, .secondary-button:focus-visible { outline: 3px solid #43825866; outline-offset: 2px; }
				.form-note { margin: -8px 0 0; color: #849087; font-size: 12px; text-align: center; }
				.booking-confirmation { padding: 26px; border-radius: 14px; background: #f2f8f3; text-align: center; }
				.confirmation-icon { display: grid; width: 42px; height: 42px; place-items: center; margin: 0 auto 12px; border-radius: 50%; background: #dcefe0; color: #286642; font-size: 22px; font-weight: 700; }
				.booking-confirmation h2 { margin: 0 0 8px; }
				.booking-confirmation p { margin: 0 auto 18px; color: #69786e; line-height: 1.6; }
				.secondary-button { padding: 11px 16px; border: 1px solid #b9cebe; border-radius: 8px; background: white; color: #286642; cursor: pointer; font: inherit; font-weight: 650; }
				@media (max-width: 520px) { .booking-form { grid-template-columns: 1fr; } .full-width { grid-column: auto; } }
			`}</style>
		</main>
	);
}
