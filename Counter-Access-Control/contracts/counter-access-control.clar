(define-map roles
  (tuple (address principal))
  (tuple (is-admin bool))
)

(define (get-role (addr principal))
  (default (map-get roles (tuple (address addr))) (tuple (is-admin false)))
)

(define (require-admin)
  (if (is-admin (get-role tx-sender))
    (ok true)
    (err u101) ;; Error code for unauthorized access
  )
)

(define (increment-counter)
  (require-admin)
  (begin
    (set! counter (+ counter 1))
    (ok counter)
  )
)

(define (decrement-counter)
  (require-admin)
  (begin
    (set! counter (- counter 1))
    (ok counter)
  )
)

(define (transfer-admin (new-admin principal))
  (require-admin)
  (begin
    (map-set roles (tuple (address new-admin)) (tuple (is-admin true)))
    (map-set roles (tuple (address tx-sender)) (tuple (is-admin false)))
    (ok "Admin rights transferred")
  )
)

(define (get-counter)
  (ok counter)
)

(define-public (initialize)
  (begin
    (map-set roles (tuple (address tx-sender)) (tuple (is-admin true)))
    (ok "Contract initialized")
  )
)

(define (reset-counter)
  (require-admin)
  (begin
    (set! counter 0)
    (ok counter)
  )
)

(define (get-admin)
  (ok (get-role tx-sender))
)

(define (set! (var any) (val any))
  (if (is-err (var))
    (err u102) ;; Error code for setting variable
    (var val)
  )
)

(define (get-counter-value)
  (ok counter)
)

(define-counter counter 0)