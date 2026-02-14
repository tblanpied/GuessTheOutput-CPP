#include <iostream>

class S {
    mutable int n = 0;
public:
    void tick() const {
        std::cout << ++n;
    }
};

int main() {
    const S s;
    s.tick();
    s.tick();
    std::cout << "\n";
}
