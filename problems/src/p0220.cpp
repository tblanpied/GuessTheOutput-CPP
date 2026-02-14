class B {};
class D : B {};

int main() {
    D d;
    B* p = &d;
    (void)p;
}
